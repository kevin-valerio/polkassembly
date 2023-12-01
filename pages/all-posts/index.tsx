// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { GetServerSideProps } from 'next';
import { getOnChainPosts, IPostsListingResponse } from 'pages/api/v1/listing/all-on-chain-posts';
import { getOnChainPostsCount } from 'pages/api/v1/listing/all-on-chain-posts-count';
import { IReferendumV2PostsByStatus } from 'pages/root';
import React, { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getNetworkFromReqHeaders } from '~src/api-utils';
import { redisGet, redisSet } from '~src/auth/redis';
import TrackListingCard from '~src/components/Listing/Tracks/TrackListingCard';
import { LISTING_LIMIT } from '~src/global/listingLimit';
import { getSubsquidProposalType, ProposalType } from '~src/global/proposalType';
import SEOHead from '~src/global/SEOHead';
import { sortValues } from '~src/global/sortOptions';
import { setNetwork } from '~src/redux/network';
import { IApiResponse } from '~src/types';
import { ErrorState } from '~src/ui-components/UIStates';
import checkRouteNetworkWithRedirect from '~src/util/checkRouteNetworkWithRedirect';
import { generateKey } from '~src/util/getRedisKeys';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const network = getNetworkFromReqHeaders(req.headers);

	const networkRedirect = checkRouteNetworkWithRedirect(network);
	if (networkRedirect) return networkRedirect;

	const { page = 1, sortBy = sortValues.NEWEST, filterBy, trackStatus } = query;
	if (!trackStatus && !filterBy) {
		return {
			props: {},
			redirect: {
				destination: '/all-posts?trackStatus=all&page=1'
			}
		};
	}

	const proposalType = ProposalType.OPEN_GOV;

	const subsquidProposalType = getSubsquidProposalType(proposalType);

	const redisKey = generateKey({ filterBy, keyType: 'trackId', network, page, sortBy, subsquidProposalType, trackStatus });

	if (process.env.IS_CACHING_ALLOWED == '1') {
		const redisData = await redisGet(redisKey);
		if (redisData) {
			const props = JSON.parse(redisData);
			if (!props.error) {
				return { props };
			}
		}
	}

	const fetches = ['CustomStatusSubmitted', 'CustomStatusVoting', 'CustomStatusClosed', 'All'].reduce((prev: any, status) => {
		const strTrackStatus = trackStatus ? String(trackStatus) : 'all';
		if (status.toLowerCase().includes(strTrackStatus)) {
			prev[strTrackStatus] = getOnChainPosts({
				filterBy: filterBy && Array.isArray(JSON.parse(decodeURIComponent(String(filterBy)))) ? JSON.parse(decodeURIComponent(String(filterBy))) : [],
				listingLimit: LISTING_LIMIT,
				network,
				page,
				proposalType,
				sortBy,
				trackStatus: status
			});
		} else {
			prev[status.toLowerCase().replace('customstatus', '')] = getOnChainPostsCount({
				network,
				page,
				proposalType,
				trackStatus: status
			});
		}
		return prev;
	}, {});

	const responseArr = await Promise.allSettled(Object.values(fetches));

	const results = responseArr.map((result) => {
		if (result.status === 'fulfilled') {
			return result.value;
		} else {
			return {
				data: null,
				error: result.reason
			} as IApiResponse<IPostsListingResponse>;
		}
	});
	const props: ISmallSpenderProps = {
		network,
		posts: {}
	};
	Object.keys(fetches).forEach((key, index) => {
		(props.posts as any)[key] = results[index];
	});

	if (process.env.IS_CACHING_ALLOWED == '1') {
		await redisSet(redisKey, JSON.stringify(props));
	}

	return { props };
};
interface ISmallSpenderProps {
	posts: IReferendumV2PostsByStatus;
	network: string;
	error?: string;
}

const SmallSpender: FC<ISmallSpenderProps> = (props) => {
	const { posts, error, network } = props;
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(setNetwork(props.network));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) return <ErrorState errorMessage={error} />;

	if (!posts || Object.keys(posts).length === 0) return null;
	return (
		<>
			<SEOHead
				title='All Tracks'
				network={network}
			/>
			<TrackListingCard
				className='mt-12'
				posts={posts}
				trackName='All Tracks'
			/>
		</>
	);
};

export default SmallSpender;
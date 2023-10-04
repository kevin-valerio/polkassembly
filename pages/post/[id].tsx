// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import type { GetServerSideProps } from 'next';
import { getOffChainPost } from 'pages/api/v1/posts/off-chain-post';
import { IPostResponse } from 'pages/api/v1/posts/on-chain-post';
import React, { FC, useEffect } from 'react';
import { PostCategory } from 'src/global/post_categories';
import BackToListingView from 'src/ui-components/BackToListingView';
import { ErrorState, LoadingState } from 'src/ui-components/UIStates';
import { useTheme } from 'next-themes';

import { getNetworkFromReqHeaders } from '~src/api-utils';
import Post from '~src/components/Post/Post';
import { useNetworkContext } from '~src/context';
import { noTitle } from '~src/global/noTitle';
import { OffChainProposalType, ProposalType } from '~src/global/proposalType';
import SEOHead from '~src/global/SEOHead';
import checkRouteNetworkWithRedirect from '~src/util/checkRouteNetworkWithRedirect';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const { id } = query;
	const network = getNetworkFromReqHeaders(req.headers);

	const networkRedirect = checkRouteNetworkWithRedirect(network);
	if (networkRedirect) return networkRedirect;

	const { data, error } = await getOffChainPost({
		network,
		postId: id,
		proposalType: OffChainProposalType.DISCUSSIONS
	});
	return { props: { error, network, post: data } };
};

interface IDiscussionPostProps {
	post: IPostResponse;
	error?: string;
	network: string;
}
const DiscussionPost: FC<IDiscussionPostProps> = (props) => {
	const { post, error, network } = props;
	const { setNetwork } = useNetworkContext();
	const { resolvedTheme:theme } = useTheme();

	useEffect(() => {
		setNetwork(props.network);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (error) return <ErrorState errorMessage={error} />;

	if (post)
		return (
			<>
				<SEOHead
					title={post.title || `${noTitle} Discussion`}
					desc={post.content}
					network={network}
				/>

				<BackToListingView postCategory={PostCategory.DISCUSSION} />

<<<<<<< HEAD
		<div className='mt-6' >
			<Post post={post} theme={theme} proposalType={ProposalType.DISCUSSIONS} />
=======
				<div className='mt-6'>
					<Post
						post={post}
						proposalType={ProposalType.DISCUSSIONS}
					/>
				</div>
			</>
		);

	return (
		<div className='mt-16'>
			<LoadingState />
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
		</div>
	);
};

export default DiscussionPost;

// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Button, Select, Tabs } from 'antd';
import { GetServerSideProps } from 'next';
import { getUserProfileWithUsername } from 'pages/api/v1/auth/data/userProfileWithUsername';
import { getDefaultUserPosts, getUserPosts, IUserPostsListingResponse } from 'pages/api/v1/listing/user-posts';
import React, { FC, useEffect, useState } from 'react';
import { useNetworkContext } from 'src/context';
import styled from 'styled-components';

import { getNetworkFromReqHeaders } from '~src/api-utils';
import { ProfileDetailsResponse } from '~src/auth/types';
import PostsTab from '~src/components/User/PostsTab';
import Details from '~src/components/UserProfile/Details';
import { EGovType } from '~src/global/proposalType';
import SEOHead from '~src/global/SEOHead';
import CountBadgePill from '~src/ui-components/CountBadgePill';
import ErrorAlert from '~src/ui-components/ErrorAlert';
import UserNotFound from '~assets/user-not-found.svg';
import checkRouteNetworkWithRedirect from '~src/util/checkRouteNetworkWithRedirect';

interface IUserProfileProps {
	userPosts: {
		data: IUserPostsListingResponse;
		error: string | null;
	};
	userProfile: {
		data: ProfileDetailsResponse;
		error: string | null;
	};
	network: string;
	className?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const req = context.req;
	const network = getNetworkFromReqHeaders(req.headers);

	const networkRedirect = checkRouteNetworkWithRedirect(network);
	if (networkRedirect) return networkRedirect;

	const username = context.params?.username;
	if (!username) {
		return {
			props: {
				error: 'No username provided'
			}
		};
	}

	const userProfile = await getUserProfileWithUsername(username.toString());
	const userPosts = await getUserPosts({
		addresses: userProfile?.data?.addresses || [],
		network,
		userId: userProfile?.data?.user_id
	});
	const props: IUserProfileProps = {
		network,
		userPosts: {
			data: userPosts.data || getDefaultUserPosts(),
			error: userPosts.error
		},
		userProfile: {
			data: userProfile.data || {
				addresses: [],
				badges: [],
				bio: '',
				image: '',
				social_links: [],
				title: '',
				user_id: 0,
				username: String(username)
			},
			error: userProfile.error
		}
	};
	return {
		props
	};
};

const EmptyState = styled.div`
	display: flex;
	flex-direction: column;
	gap: 16px;

	svg {
		max-width: 600px;
		margin: auto;
	}
`;

const UserProfile: FC<IUserProfileProps> = (props) => {
	const { userPosts, network, userProfile, className } = props;
	const { setNetwork } = useNetworkContext();
	const [selectedGov, setSelectedGov] = useState(EGovType.GOV1);
	const [voteClicked, setVoteClicked] = useState(false);
	const [postsClicked, setPostsClicked] = useState(false);
	const [showVoteData, setShowVoteData] = useState(false);
	const [showPostData, setShowPostData] = useState(false);

	useEffect(() => {
		setNetwork(network);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (userPosts.error === 'UserId is invalid') {
		return (
			<EmptyState>
				<ErrorAlert errorMsg="Invalid User. This user does't have any account with Polkassembly" />
				<UserNotFound />
			</EmptyState>
		);
	}
	if (userPosts.error || userProfile.error) {
		return <ErrorAlert errorMsg={userPosts.error || userProfile.error || ''} />;
	}
	const tabItems = Object.entries(userPosts.data?.[selectedGov]).map(([key, value]) => {
		if (!value) return null;
		let count = 0;
		if (Array.isArray(value)) {
			count = value.length;
		} else {
			Object.values(value).forEach((v) => {
				if (v && Array.isArray(v)) {
					count += v.length;
				}
			});
		}
		return {
			children: <PostsTab posts={value} />,
			key: key,
			label: (
				<CountBadgePill
					label={key?.split('_').join(' ') || ''}
					count={count}
				/>
			)
		};
	});
	return (
		<>
			<SEOHead
				title='User Profile'
				network={network}
			/>
			<section className={`my-0 flex h-full min-h-[calc(100vh-150px)] rounded-[4px] pb-5 md:bg-white md:pb-0 md:shadow-md ${className}`}>
				<Details
					userPosts={userPosts.data}
					userProfile={userProfile}
				/>
				<article className='hidden w-[calc(100%-330px)] flex-1 flex-col px-10 py-6 md:flex'>
					<div className='flex items-start justify-between'>
						<h2 className='text-[28px] font-semibold leading-[42px] text-sidebarBlue'>Activity</h2>
						<Select
							value={selectedGov}
							style={{
								width: 120
							}}
							onChange={(v) => {
								setSelectedGov(v);
							}}
							options={[
								{
									label: 'Gov1',
									value: 'gov1'
								},
								{
									label: 'OpenGov',
									value: 'open_gov'
								}
							]}
						/>
					</div>
					<div
						className='-ml-1 flex h-10 w-[152px] items-center justify-center px-[12px] py-[6px] pt-1'
						style={{ backgroundColor: '#F5F6F8', borderRadius: '10px' }}
					>
						<Button
							onClick={() => {
								setVoteClicked(true);
								setPostsClicked(false);
								setShowPostData(false);
								setShowVoteData(true);
							}}
							className={`border-none px-3 text-base ${voteClicked ? 'bg-white font-semibold text-pink_primary' : 'text-darkBlue bg-transparent font-normal'}`}
						>
							Votes
						</Button>
						<Button
							onClick={() => {
								setVoteClicked(false);
								setPostsClicked(true);
								setShowPostData(true);
								setShowVoteData(false);
							}}
							className={`border-none px-4 text-base ${postsClicked ? 'bg-white font-semibold text-pink_primary' : 'text-darkBlue bg-transparent font-normal'}`}
						>
							Posts
						</Button>
					</div>
					{showPostData && (
						<div className='fullHeight mt-6'>
							<Tabs
								className='ant-tabs-tab-bg-white font-medium text-sidebarBlue'
								type='card'
								items={tabItems as any}
							/>
						</div>
					)}
					{showVoteData && <div className='fullHeight mt-6'>votedata</div>}
				</article>
			</section>
		</>
	);
};

export default styled(UserProfile)`
	.fullHeight .ant-tabs-content-holder {
		height: 100% !important;
	}
	.fullHeight .ant-tabs-content {
		height: 100% !important;
	}
	.fullHeight .ant-tabs {
		height: 100% !important;
	}
	.fullHeight .ant-tabs-tabpane {
		height: 100% !important;
	}
`;

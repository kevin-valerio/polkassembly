// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import MembersContainer from 'src/components/Listing/Members/MembersContainer';

import { getNetworkFromReqHeaders } from '~src/api-utils';
import SEOHead from '~src/global/SEOHead';
import { setNetwork } from '~src/redux/network';
import { useNetworkSelector } from '~src/redux/selectors';
import checkRouteNetworkWithRedirect from '~src/util/checkRouteNetworkWithRedirect';
import { getSubdomain } from '~src/util/getSubdomain';

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	let network = getNetworkFromReqHeaders(req.headers);
	const referer = req.headers.referer;

	let queryNetwork = null;
	if (referer) {
		try {
			const url = new URL(referer);
			queryNetwork = url.searchParams.get('network');
		} catch (error) {
			console.error('Invalid referer URL:', referer, error);
		}
	}
	if (queryNetwork) {
		network = queryNetwork;
	}
	if (query?.network) {
		network = query?.network as string;
	}

	const networkRedirect = checkRouteNetworkWithRedirect(network);
	if (networkRedirect) return networkRedirect;

	return { props: { network } };
};

const Members = (props: { network: string }) => {
	const dispatch = useDispatch();
	const router = useRouter();
	const { network } = useNetworkSelector();

	useEffect(() => {
		dispatch(setNetwork(props.network));
		const currentUrl = window ? window.location.href : '';
		const subDomain = getSubdomain(currentUrl);
		if (network && ![subDomain]?.includes(network)) {
			router.push({
				query: {
					network: network
				}
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<SEOHead
				title='Council'
				desc='Meet the dedicated team of council members who work tirelessly to ensure effective and fair governance for the community on Polkassembly.'
				network={props.network}
			/>
			<h1 className='mx-2 text-2xl font-semibold leading-9 text-bodyBlue dark:text-blue-dark-high'>Council</h1>

			{/* Intro and Create Post Button */}
			<div className='flex flex-col md:flex-row'>
				<p className='mb-4 w-full rounded-xxl bg-white p-4 text-sm font-medium text-bodyBlue shadow-md dark:bg-section-dark-overlay dark:text-blue-dark-high md:p-8'>
					Council is the body of elected members that consists of several on-chain accounts. The Council can act as a representative for &quot;passive&quot; (non-voting)
					stakeholders. Council members have two main tasks: proposing referenda for the overall stakeholder group to vote on and cancelling malicious referenda.
				</p>
			</div>
			<MembersContainer className='mt-8' />
		</>
	);
};

export default Members;

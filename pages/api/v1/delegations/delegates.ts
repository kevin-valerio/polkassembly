// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import type { NextApiRequest, NextApiResponse } from 'next';

import withErrorHandling from '~src/api-middlewares/withErrorHandling';
import { isValidNetwork } from '~src/api-utils';
import { isOpenGovSupported } from '~src/global/openGovNetworks';
import { GET_ALL_TRACK_LEVEL_ANALYTICS_DELEGATION_DATA, RECEIVED_DELEGATIONS_AND_VOTES_COUNT_FOR_ADDRESS } from '~src/queries';
import fetchSubsquid from '~src/util/fetchSubsquid';
import getEncodedAddress from '~src/util/getEncodedAddress';
import { isAddress } from 'ethers';
import { IDelegate } from '~src/types';
import * as admin from 'firebase-admin';
import storeApiKeyUsage from '~src/api-middlewares/storeApiKeyUsage';

const firestore_db = admin.firestore();

const w3fDelegatesPolkadot = [
	{
		address: '13SceNt2ELz3ti4rnQbY1snpYH4XE4fLFsW8ph9rpwJd6HFC',
		longDescription: '',
		name: 'Polkassembly',
		shortDescription: ''
	},
	{
		address: '13EyMuuDHwtq5RD6w3psCJ9WvJFZzDDion6Fd2FVAqxz1g7K',
		longDescription: '',
		name: 'ChaosDAO OpenGov',
		shortDescription: ''
	},
	{
		address: '1jPw3Qo72Ahn7Ynfg8kmYNLEPvHWHhPfPNgpJfp5bkLZdrF',
		longDescription: '',
		name: 'JimmyTudeski - Polkadot Resident',
		shortDescription: ''
	},
	{
		address: '15fTH34bbKGMUjF1bLmTqxPYgpg481imThwhWcQfCyktyBzL',
		longDescription: '',
		name: 'HELIKON',
		shortDescription: ''
	},
	{
		address: '12s6UMSSfE2bNxtYrJc6eeuZ7UxQnRpUzaAh1gPQrGNFnE8h',
		longDescription: '',
		name: 'Polkadotters',
		shortDescription: ''
	},
	{
		address: '153YD8ZHD9dRh82U419bSCB5SzWhbdAFzjj4NtA5pMazR2yC',
		longDescription: '',
		name: 'SAXEMBERG',
		shortDescription: ''
	},
	{
		address: '1ZSPR3zNg5Po3obkhXTPR95DepNBzBZ3CyomHXGHK9Uvx6w',
		longDescription: '',
		name: 'William',
		shortDescription: ''
	},
	{
		address: '12mP4sjCfKbDyMRAEyLpkeHeoYtS5USY4x34n9NMwQrcEyoh',
		longDescription: '',
		name: 'Polkaworld',
		shortDescription: ''
	},
	{
		address: '1CaXBXVGNbey352w7ydA1A2yDyNQLshycom8Zyj69v5eRNK',
		longDescription: '',
		name: 'BRA_16-D',
		shortDescription: ''
	},
	{
		address: '14Gn7SEmCgMX7Ukuppnw5TRjA7pao2HFpuJo39frB42tYLEh',
		longDescription: '',
		name: 'EzioRed',
		shortDescription: ''
	},
	{
		address: '12BJTP99gUerdvBhPobiTvrWwRaj1i5eFHN9qx51JWgrBtmv',
		longDescription: '',
		name: 'OneBlock',
		shortDescription: ''
	},
	{
		address: '16XYgDGN6MxvdmjhRsHLT1oqQVDwGdEPVQqC42pRXiZrE8su',
		longDescription: '',
		name: 'Irina Karagyaur',
		shortDescription: ''
	}
];

const w3fDelegatesKusama = [
	{
		address: 'GqC37KSFFeGAoL7YxSeP1YDwr85WJvLmDDQiSaprTDAm8Jj',
		longDescription: '',
		name: 'Adam_Clay_Steeber',
		shortDescription: ''
	},
	{
		address: 'Dm4uKxZJZHJbpZpfnYPiHnbgyHWKMU1s5h6X7kqjfYv1Xkk',
		longDescription: '',
		name: 'PromoTeam | Web3 Uzbekistan',
		shortDescription: ''
	},
	{
		address: 'EocabFvqttEamwQKoFyQxLPnx9HWDdVDS9wwrUX1aKKbJ5g',
		longDescription: '',
		name: 'Alzymologist',
		shortDescription: ''
	},
	{
		address: 'FDL99LDYERjevxPnXBjNGHZv13FxCGHrqh2N5zWQXx1finf',
		longDescription: '',
		name: 'Georgii / Space Invader',
		shortDescription: ''
	},
	{
		address: 'HyLisujX7Cr6D7xzb6qadFdedLt8hmArB6ZVGJ6xsCUHqmx',
		longDescription: '',
		name: 'Ivy voter collective',
		shortDescription: ''
	},
	{
		address: 'FcjmeNzPk3vgdENm1rHeiMCxFK96beUoi2kb59FmCoZtkGF',
		longDescription: '',
		name: 'Staker Space',
		shortDescription: ''
	}
];

export const getDelegatesData = async (network: string, address?: string) => {
	if (!network || !isOpenGovSupported(network)) return [];

	const encodedAddr = address ? getEncodedAddress(String(address), network) : address;

	const novaDelegatesKusama = await fetch('https://raw.githubusercontent.com/novasamatech/opengov-delegate-registry/master/registry/polkadot.json').then((res) => res.json());
	const novaDelegatesPolkadot = await fetch('https://raw.githubusercontent.com/novasamatech/opengov-delegate-registry/master/registry/kusama.json').then((res) => res.json());
	const parityDelegatesPolkadot = await fetch('https://paritytech.github.io/governance-ui/data/polkadot/delegates.json').then((res) => res.json());
	const parityDelegatesKusama = await fetch('https://paritytech.github.io/governance-ui/data/kusama/delegates.json').then((res) => res.json());
	const novaDelegates = network === 'kusama' ? novaDelegatesKusama : novaDelegatesPolkadot;
	const parityDelegates = network === 'kusama' ? parityDelegatesKusama : parityDelegatesPolkadot;
	const W3fDelegates = network === 'kusama' ? w3fDelegatesKusama : w3fDelegatesPolkadot;
	if (address && !(encodedAddr || isAddress(String(address)))) return [];

	const subsquidFetches: { [index: string]: any } = {};

	const paDelegatesResults: any[] = [];

	const data = await fetchSubsquid({
		network,
		query: GET_ALL_TRACK_LEVEL_ANALYTICS_DELEGATION_DATA
	});

	const totalDelegatorsObj: any = {};
	data['data']?.votingDelegations.map((delegation: { from: string }) => {
		if (totalDelegatorsObj[delegation?.from] === undefined) {
			totalDelegatorsObj[delegation?.from] = 1;
		} else {
			totalDelegatorsObj[delegation?.from] = totalDelegatorsObj[delegation?.from]?.count + 1;
		}
	});

	const paDelegatesSnapshot = await firestore_db.collection('networks').doc(network).collection('pa_delegates').get();
	if (!paDelegatesSnapshot.empty) {
		const paDelegatesPromise = paDelegatesSnapshot.docs.map(async (delegate) => {
			const data = delegate?.data();
			return data;
		});

		const paDelegates = await Promise.allSettled(Object.values(paDelegatesPromise));
		paDelegates.map((delegate) => {
			if (delegate?.status === 'fulfilled') {
				paDelegatesResults.push(delegate?.value as IDelegate);
			}
		});
	}
	const combinedDelegates = [
		...Object.keys(totalDelegatorsObj).map((key) => {
			return { address: key, bio: '' };
		}),
		...paDelegatesResults,
		...W3fDelegates.map((item) => {
			{
				return { ...item, dataSource: 'w3f' };
			}
		}),
		...novaDelegates.map((item: any) => {
			return { ...item, dataSource: 'nova' };
		}),
		...parityDelegates.map((item: any) => {
			return { ...item, dataSource: 'parity' };
		})
	];
	const combinedDelegatesUniqueData: any = {};
	combinedDelegates.map((item) => {
		const addr = getEncodedAddress(item?.address, network) || item?.address;
		if (combinedDelegatesUniqueData[addr] === undefined) {
			if (!item.dataSource) {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					withoutSource: { ...(combinedDelegatesUniqueData[addr]?.withoutSource || {}), ...item }
				};
			}
			if (item?.dataSource === 'nova') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					nova: { ...(combinedDelegatesUniqueData[addr]?.nova || {}), ...item }
				};
			}
			if (item?.dataSource === 'parity') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					parity: { ...(combinedDelegatesUniqueData[addr]?.parity || {}), ...item }
				};
			}
			if (item?.dataSource === 'polkassembly') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					polkassembly: { ...(combinedDelegatesUniqueData[addr]?.polkassembly || {}), ...item }
				};
			}
			if (item?.dataSource === 'w3f') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					w3f: { ...(combinedDelegatesUniqueData[addr]?.w3f || {}), ...item }
				};
			}
		}
		if (combinedDelegatesUniqueData[addr] !== undefined) {
			if (!item.dataSource) {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					withoutSource: { ...(combinedDelegatesUniqueData[addr]?.withoutSource || {}), ...item }
				};
			}
			if (item?.dataSource === 'nova') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					nova: { ...(combinedDelegatesUniqueData[addr]?.nova || {}), ...item }
				};
			}
			if (item?.dataSource === 'parity') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					parity: { ...(combinedDelegatesUniqueData[addr]?.parity || {}), ...item }
				};
			}
			if (item?.dataSource === 'polkassembly') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					polkassembly: { ...(combinedDelegatesUniqueData[addr]?.polkassembly || {}), ...item }
				};
			}
			if (item?.dataSource === 'w3f') {
				combinedDelegatesUniqueData[addr] = {
					...(combinedDelegatesUniqueData[addr] || {}),
					w3f: { ...(combinedDelegatesUniqueData[addr]?.w3f || {}), ...item }
				};
			}
		}
	});

	const currentDate = new Date();
	if (encodedAddr) {
		subsquidFetches[encodedAddr] = fetchSubsquid({
			network,
			query: RECEIVED_DELEGATIONS_AND_VOTES_COUNT_FOR_ADDRESS,
			variables: {
				address: String(encodedAddr),
				createdAt_gte: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
			}
		});
	} else {
		Object.keys(combinedDelegatesUniqueData).map((addr) => {
			subsquidFetches[addr] = fetchSubsquid({
				network,
				query: RECEIVED_DELEGATIONS_AND_VOTES_COUNT_FOR_ADDRESS,
				variables: {
					address: String(addr),
					createdAt_gte: new Date(currentDate.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString() // 30 days ago
				}
			});
		});
	}

	const subsquidResults = await Promise.allSettled(Object.values(subsquidFetches));

	const result: IDelegate[] = [];

	for (const [index, delegateData] of subsquidResults.entries()) {
		const receivedDelgations: any = {};

		if (!delegateData || delegateData.status !== 'fulfilled') continue;

		delegateData.value.data?.votingDelegations?.map((delegation: any) => {
			if (receivedDelgations[delegation?.from] === undefined) {
				receivedDelgations[delegation?.from] = 1;
			}
		});

		const votesCount = Number(delegateData.value.data?.convictionVotesConnection?.totalCount || 0);
		const address = Object.keys(subsquidFetches)[index];
		if (!address) continue;
		let bio = '';
		let username = '';
		const dataSource = [];
		if (combinedDelegatesUniqueData?.[address]?.nova) {
			if (combinedDelegatesUniqueData?.[address]?.nova?.longDescription?.length) {
				bio = combinedDelegatesUniqueData?.[address]?.nova?.longDescription || '';
				username = combinedDelegatesUniqueData?.[address]?.nova?.name || '';
			}
			dataSource.push('nova');
		}
		if (combinedDelegatesUniqueData?.[address]?.w3f) {
			if (combinedDelegatesUniqueData?.[address]?.w3f?.longDescription?.length) {
				bio = combinedDelegatesUniqueData?.[address]?.w3f?.longDescription || '';
				username = combinedDelegatesUniqueData?.[address]?.w3f?.name || '';
			}
			dataSource.push('w3f');
		}
		if (combinedDelegatesUniqueData?.[address]?.parity) {
			if (combinedDelegatesUniqueData?.[address]?.parity?.manifesto?.length) {
				bio = combinedDelegatesUniqueData?.[address]?.parity?.manifesto || '';
				username = combinedDelegatesUniqueData?.[address]?.parity?.name;
			}
			dataSource.push('parity');
		}
		if (combinedDelegatesUniqueData[address]?.polkassembly) {
			if (combinedDelegatesUniqueData?.[address]?.polkassembly?.bio?.length) {
				bio = combinedDelegatesUniqueData?.[address]?.polkassembly?.bio || '';
				username = combinedDelegatesUniqueData?.[address]?.polkassembly?.name || '';
			}
			dataSource.push('polkassembly');
		}
		if (combinedDelegatesUniqueData?.[address]) {
			const newDelegate: IDelegate = {
				active_delegation_count: Object.keys(receivedDelgations)?.length || 0,
				address,
				bio: bio || '',
				dataSource,
				name: username,
				voted_proposals_count: votesCount
			};
			result.push(newDelegate);
		}
	}
	return result;
};

async function handler(req: NextApiRequest, res: NextApiResponse<IDelegate[] | { error: string }>) {
	storeApiKeyUsage(req);

	const network = String(req.headers['x-network']);
	if (!network || !isValidNetwork(network)) return res.status(400).json({ error: 'Invalid network in request header' });

	const { address } = req.body;
	if (address && !(getEncodedAddress(String(address), network) || isAddress(String(address)))) return res.status(400).json({ error: 'Invalid address' });

	const result = await getDelegatesData(network, address ? String(address) : undefined);
	return res.status(200).json(result as IDelegate[]);
}

export default withErrorHandling(handler);

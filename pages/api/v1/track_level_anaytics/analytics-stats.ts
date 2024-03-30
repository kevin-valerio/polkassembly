// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import type { NextApiHandler } from 'next';
import withErrorHandling from '~src/api-middlewares/withErrorHandling';
import { isValidNetwork } from '~src/api-utils';
import { MessageType } from '~src/auth/types';
import messages from '~src/auth/utils/messages';
import storeApiKeyUsage from '~src/api-middlewares/storeApiKeyUsage';
import fetchSubsquid from '~src/util/fetchSubsquid';
import { GET_TRACK_LEVEL_ANALYTICS_STATS } from '~src/queries';
import dayjs from 'dayjs';
import apiErrorWithStatusCode from '~src/util/apiErrorWithStatusCode';
import { ITrackAnalyticsStats } from '~src/types';

export const getTrackAnalyticsStats = async ({ trackNum, network }: { trackNum: number; network: string }) => {
	if (!network || !isValidNetwork(network)) {
		throw apiErrorWithStatusCode(messages.INVALID_NETWORK, 400);
	}
	if (typeof trackNum !== 'number') throw apiErrorWithStatusCode(messages.INVALID_PARAMS, 400);

	try {
		const subsquidRes = await fetchSubsquid({
			network,
			query: GET_TRACK_LEVEL_ANALYTICS_STATS,
			variables: {
				before: dayjs().subtract(7, 'days').toISOString(),
				track_num: Number(trackNum)
			}
		});
		const data = subsquidRes['data'];
		const diffActiveProposals = (data?.diffActiveProposals?.totalCount * 100) / data?.totalActiveProposals?.totalCount;
		const diffProposalCount = (data?.diffProposalCount?.totalCount * 100) / data?.totalProposalCount.totalCount;
		return {
			data: {
				activeProposals: { diff: diffActiveProposals.toFixed(2) || 0, total: data?.totalActiveProposals?.totalCount || 0 },
				allProposals: { diff: diffProposalCount.toFixed(2) || 0, total: data?.totalProposalCount?.totalCount || 0 }
			},
			error: null
		};
	} catch (err) {
		return { data: null, error: err };
	}
};

const handler: NextApiHandler<{ data: ITrackAnalyticsStats } | MessageType> = async (req, res) => {
	storeApiKeyUsage(req);

	const network = String(req.headers['x-network']);

	const { trackNum } = req.body;

	const { data, error } = await getTrackAnalyticsStats({ network, trackNum });

	if (data) {
		return res.status(200).json({ data: data as ITrackAnalyticsStats });
	} else {
		return res.status(500).json({ message: error || 'Activities count not found!' });
	}
};
export default withErrorHandling(handler);

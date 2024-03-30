// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

export interface IGov1TreasuryProposalStore {
	isDiscussionLinked: boolean | null;
	discussionLink: string;
	discussionId: number | null;
	title: string;
	content: string;
	tags: string[];
	proposer: string;
	beneficiary: string;
	fundingAmount: string;
	firstStepPercentage: number;
	secondStepPercentage: number;
	showIdentityInfoCardForBeneficiary: boolean;
	showIdentityInfoCardForProposer: boolean;
	showMultisigInfoCard: boolean;
	isIdentityCardLoading: boolean;
	isMultisigCardLoading: boolean;
	proposalIndex: null | number;
}

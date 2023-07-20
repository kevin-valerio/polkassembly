// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
// SPDX-License-Identifier: Apache-2.0
// Do not edit, auto-generated by @polkadot/apps-config
import type { OverrideBundleType } from '@polkadot/types/types';
/* eslint-disable quotes */
/* eslint-disable quote-props */
/* eslint-disable sort-keys */
export const typesBundleCrust = {
	spec: {
		crust: {
			rpc: {},
			types: [
				{
					minmax: [null, null],
					types: {
						AccountInfo: 'AccountInfoWithProviders',
						Address: 'AccountId',
						AddressInfo: 'Vec<u8>',
						LookupSource: 'AccountId',
						EraBenefits: {
							total_fee_reduction_quota: 'Compact<Balance>',
							total_market_active_funds: 'Compact<Balance>',
							used_fee_reduction_quota: 'Compact<Balance>',
							active_era: 'Compact<EraIndex>'
						},
						FundsType: {
							_enum: ['SWORK', 'MARKET']
						},
						FundsUnlockChunk: {
							value: 'Compact<Balance>',
							era: 'Compact<EraIndex>'
						},
						MarketBenefit: {
							total_funds: 'Compact<Balance>',
							active_funds: 'Compact<Balance>',
							used_fee_reduction_quota: 'Compact<Balance>',
							file_reward: 'Compact<Balance>',
							refreshed_at: 'Compact<EraIndex>',
							unlocking_funds: 'Vec<FundsUnlockChunk<Balance>>'
						},
						SworkBenefit: {
							total_funds: 'Compact<Balance>',
							active_funds: 'Compact<Balance>',
							total_fee_reduction_count: 'u32',
							used_fee_reduction_count: 'u32',
							refreshed_at: 'Compact<EraIndex>',
							unlocking_funds: 'Vec<FundsUnlockChunk<Balance>>'
						},
						BridgeChainId: 'u8',
						ChainId: 'u8',
						ResourceId: 'H256',
						DepositNonce: 'u64',
						ProposalStatus: {
							_enum: ['Initiated', 'Approved', 'Rejected']
						},
						ProposalVotes: {
							votes_for: 'Vec<AccountId>',
							votes_against: 'Vec<AccountId>',
							status: 'ProposalStatus',
							expiry: 'BlockNumber'
						},
						Erc721Token: {
							id: 'TokenId',
							metadata: 'Vec<u8>'
						},
						TokenId: 'U256',
						ETHAddress: 'Vec<u8>',
						EthereumTxHash: 'H256',
						Lock: {
							total: 'Compact<Balance>',
							last_unlock_at: 'BlockNumber',
							lock_type: 'LockType'
						},
						LockType: {
							delay: 'BlockNumber',
							lock_period: 'u32'
						},
						FileInfo: {
							file_size: 'u64',
							spower: 'u64',
							expired_at: 'BlockNumber',
							calculated_at: 'BlockNumber',
							amount: 'Compact<Balance>',
							prepaid: 'Compact<Balance>',
							reported_replica_count: 'u32',
							replicas: 'Vec<Replica<AccountId>>'
						},
						FileInfoV2: {
							file_size: 'u64',
							spower: 'u64',
							expired_at: 'BlockNumber',
							calculated_at: 'BlockNumber',
							amount: 'Compact<Balance>',
							prepaid: 'Compact<Balance>',
							reported_replica_count: 'u32',
							remaining_paid_count: 'u32',
							replicas: 'BTreeMap<AccountId, Replica<AccountId>>'
						},
						Replica: {
							who: 'AccountId',
							valid_at: 'BlockNumber',
							anchor: 'SworkerAnchor',
							is_reported: 'bool',
							created_at: 'Option<BlockNumber>'
						},
						Guarantee: {
							targets:
								'Vec<IndividualExposure<AccountId, Balance>>',
							total: 'Compact<Balance>',
							submitted_in: 'EraIndex',
							suppressed: 'bool'
						},
						ValidatorPrefs: {
							guarantee_fee: 'Compact<Perbill>'
						},
						Group: {
							members: 'BTreeSet<AccountId>',
							allowlist: 'BTreeSet<AccountId>'
						},
						IASSig: 'Vec<u8>',
						Identity: {
							anchor: 'SworkerAnchor',
							punishment_deadline: 'u64',
							group: 'Option<AccountId>'
						},
						ISVBody: 'Vec<u8>',
						MerkleRoot: 'Vec<u8>',
						ReportSlot: 'u64',
						PKInfo: {
							code: 'SworkerCode',
							anchor: 'Option<SworkerAnchor>'
						},
						SworkerAnchor: 'Vec<u8>',
						SworkerCert: 'Vec<u8>',
						SworkerCode: 'Vec<u8>',
						SworkerPubKey: 'Vec<u8>',
						SworkerSignature: 'Vec<u8>',
						WorkReport: {
							report_slot: 'u64',
							spower: 'u64',
							free: 'u64',
							reported_files_size: 'u64',
							reported_srd_root: 'MerkleRoot',
							reported_files_root: 'MerkleRoot'
						}
					}
				}
			],
			alias: {}
		}
	}
} as unknown as OverrideBundleType;

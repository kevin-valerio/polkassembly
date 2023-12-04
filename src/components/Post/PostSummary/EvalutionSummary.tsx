// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { FC } from 'react';
import BeneficiaryCard from './AddressDetailsCard';
import { usePostDataContext } from '~src/context';

interface IEvalutionSummary {
	isUsedInEvaluationTab?: boolean;
}

const EvalutionSummary: FC<IEvalutionSummary> = (isUsedInEvaluationTab) => {
	const {
		postData: { proposer, beneficiaries }
	} = usePostDataContext();

	return (
		<div className='mt-4 pb-4 text-bodyBlue dark:text-blue-dark-high'>
			{!isUsedInEvaluationTab && <label className='tracking[0.01em] text-lg font-medium'>Evaluation Summary</label>}
			{beneficiaries?.length === 1 || !beneficiaries?.length ? (
				<div className='mt-4 flex items-center gap-2.5'>
					{!isUsedInEvaluationTab && <span className='text-sm tracking-[0.01em]'>{beneficiaries?.length === 1 ? 'Beneficiary is' : 'Proposer is'}</span>}
					<BeneficiaryCard
						key={beneficiaries?.length === 1 ? beneficiaries?.[0]?.address : proposer}
						address={beneficiaries?.length === 1 ? beneficiaries?.[0]?.address : proposer}
					/>
				</div>
			) : (
				<div className='mt-4 flex flex-col gap-3'>
					<span className='text-sm tracking-[0.01em]'>The {beneficiaries.length} Beneficiaries of this proposal are as follows: </span>
					{!!beneficiaries?.length &&
						beneficiaries?.map((beneficiary) => (
							<BeneficiaryCard
								key={beneficiary.address}
								address={beneficiary.address}
								showAddress
							/>
						))}
				</div>
			)}
		</div>
	);
};
export default EvalutionSummary;

// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Button } from 'antd';
import { useTheme } from 'next-themes';
import React, { FC, useState } from 'react';
import ReferendaLoginPrompts from '~src/ui-components/ReferendaLoginPrompts';

interface ILoginToVoteOrEndorseProps {
	to?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LoginToVoteOrEndorse: FC<ILoginToVoteOrEndorseProps> = (props) => {
<<<<<<< HEAD
	const [modalOpen,setModalOpen]=useState<boolean>(false);
	const { resolvedTheme:theme } = useTheme();
=======
	const [modalOpen, setModalOpen] = useState<boolean>(false);

>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
	return (
		<div>
			<Button
				className='mb-3 flex w-[100%] items-center justify-center rounded-lg border-pink_primary bg-pink_primary p-7 text-lg text-white hover:border-pink_primary  hover:bg-pink_secondary '
				onClick={() => {
					setModalOpen(!modalOpen);
				}}
			>
				Cast Vote
			</Button>
			<ReferendaLoginPrompts
				theme={theme}
				modalOpen={modalOpen}
				setModalOpen={setModalOpen}
				image='/assets/referenda-vote.png'
				title='Join Polkassembly to Vote on this proposal.'
				subtitle='Discuss, contribute and get regular updates from Polkassembly.'
			/>
		</div>
	);
};

export default LoginToVoteOrEndorse;

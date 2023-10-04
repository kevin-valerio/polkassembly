// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useState } from 'react';
import { PlusCircleOutlined } from '@ant-design/icons';
import { CHANNEL } from '.';
import DisabledConfirmation from './Modals/Confirmation';
import { Switch } from 'antd';
import ResetIcon from '~assets/icons/reset.svg';
import ResetConfirmation from './Modals/ResetConfirmation';

type Props = {
	title: string;
	description: string;
	Icon: any;
	onClick: (channelName: CHANNEL) => void;
	channel: CHANNEL;
	enabled: boolean;
	isBotSetup: boolean;
	handleEnableDisabled: (channelName: CHANNEL, enabled?: boolean) => void;
	handleReset: (channelName: CHANNEL) => void;
};

export default function BotSetupCard({ title, description, Icon, onClick, channel, enabled, isBotSetup, handleEnableDisabled, handleReset }: Props) {
	const [showModal, setShowModal] = useState<boolean>(false);
	const [showResetModal, setShowResetModal] = useState<boolean>(false);
	const handleClick = () => {
		setShowModal(true);
	};
	const handleResetClick = () => {
		setShowResetModal(true);
	};

	return (
<<<<<<< HEAD
		<div className='flex items-start text-blue-light-high dark:text-blue-dark-high gap-2 w-full justify-between'>
			<div className='flex items-start text-blue-light-high dark:text-blue-dark-high gap-2'>
				<div className={'relative mt-[2px] [&>svg]:mt-0'}>{Icon}</div>
				<div>
					<h3 className='flex text-base font-medium m-0 gap-2 text-blue-light-high dark:text-blue-dark-high'>
						{title} Notifications {!description && (
=======
		<div className='flex w-full items-start justify-between gap-2 text-[#243A57]'>
			<div className='flex items-start gap-2 text-[#243A57]'>
				<div className={'relative mt-[2px] [&>svg]:mt-0'}>{Icon}</div>
				<div>
					<h3 className='m-0 flex gap-2 text-base font-medium text-[#243A57]'>
						{title} Notifications{' '}
						{!description && (
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
							<div>
								<span className='rounded-bl-lg rounded-tr-lg border-2 border-[#5A46FF] bg-[#407BFF] px-[4px] py-[2px] text-[10px] text-[#FFFFFF]'>Coming Soon</span>
							</div>
						)}
						{!!isBotSetup && (
							<span className='flex items-center gap-1'>
								<Switch
									checked={!!enabled}
									size='small'
									onChange={(checked) => (!checked ? handleClick() : handleEnableDisabled(channel, true))}
								/>
								<label>
									<span className={`text-[14px] font-medium ${enabled ? 'text-pink_primary' : 'text-[#485F7D]'}`}>{enabled ? 'Enabled' : 'Disabled'}</span>
								</label>
							</span>
						)}
					</h3>
					{description && !isBotSetup && (
<<<<<<< HEAD
						<p className='font-normal m-0 text-[12px] leading-[18px] font-normal'>
							<span className='text-pink_primary dark:text-blue-dark-helper font-medium cursor-pointer text-[14px] leading-[21px]' onClick={() => onClick(channel)}>
=======
						<p className='m-0 text-[12px] font-normal font-normal leading-[18px]'>
							<span
								className='cursor-pointer text-[14px] font-medium leading-[21px] text-pink_primary'
								onClick={() => onClick(channel)}
							>
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
								<PlusCircleOutlined /> ADD THE POLKASSEMBLY BOT
							</span>{' '}
							to {description}
						</p>
					)}
					<DisabledConfirmation
						open={showModal}
						onConfirm={() => {
							setShowModal(false);
							handleEnableDisabled(channel);
						}}
						onCancel={() => setShowModal(false)}
						channel={channel}
					/>
					<ResetConfirmation
						open={showResetModal}
						onConfirm={() => {
							setShowResetModal(false);
							handleReset(channel);
						}}
						onCancel={() => setShowResetModal(false)}
						channel={channel}
					/>
				</div>
			</div>
			{isBotSetup && (
				<span
					className='flex cursor-pointer items-center gap-1 text-[16px] font-medium text-pink_primary underline'
					onClick={handleResetClick}
				>
					<ResetIcon /> Reset
				</span>
			)}
		</div>
	);
}

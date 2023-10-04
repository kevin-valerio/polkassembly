// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Button, Divider, Modal, Spin } from 'antd';
import React, { FC, useState } from 'react';
import { NotificationStatus } from 'src/types';
import FilteredError from 'src/ui-components/FilteredError';
import queueNotification from 'src/ui-components/QueueNotification';
import { LoadingOutlined } from '@ant-design/icons';
import { TokenType } from '~src/auth/types';
import nextApiClientFetch from '~src/util/nextApiClientFetch';

import { poppins } from 'pages/_app';
import { handleTokenChange } from '~src/services/auth.service';
import { useUserDetailsContext } from '~src/context';
import KeyboardDownIcon from '~assets/icons/keyboard-arrow-down.svg';

<<<<<<< HEAD
const Title = <div className='dark:bg-section-dark-overlay'>
	<span className='text-lg tracking-wide text-sidebarBlue font-bold dark:text-blue-dark-high dark:text-blue-dark-high dark:font-medium'>Disable Two Factor Authentication</span>
	<Divider className='mt-2 mb-0 dark:bg-[#90909060]' />
</div>;

const Disable2FA: FC<{className?: string , theme?: string}> = ({ className, theme }) => {
=======
const Title = (
	<>
		<span className='text-lg font-bold tracking-wide text-sidebarBlue'>Disable Two Factor Authentication</span>
		<Divider className='mb-0 mt-2' />
	</>
);

const Disable2FA: FC<{ className?: string }> = ({ className }) => {
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
	const [error, setError] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false);
	const currentUser = useUserDetailsContext();

	const handleSubmit = async () => {
		// don't submit if loading or if user is already 2FA enabled
		if (loading || !currentUser?.username || !currentUser.is2FAEnabled) return;
		setLoading(true);

		try {
			const { data, error } = await nextApiClientFetch<TokenType>('api/v1/auth/actions/2fa/disable');

			if (error || !data || !data.token) {
				setError(error || 'Error disabling 2FA. Please try again.');
				setLoading(false);
				return;
			}

			handleTokenChange(data.token, currentUser);

			queueNotification({
				header: 'Success',
				message: 'Two factor authentication disabled successfully!',
				status: NotificationStatus.SUCCESS
			});

			setShowModal(false);
		} catch (error) {
			//await form.validateFields(); will automatically highlight the error ridden fields
			setError('Please input a valid auth code');
			setLoading(false);
			return;
		}
	};

	const dismissModal = () => {
		setError('');
		setShowModal(false);
	};

	return (
		<>
			<Modal
				className={`${theme === 'dark'? '[&>.ant-modal-content]:bg-section-dark-overlay' : ''} ${className} ${poppins.variable} ${poppins.className}`}
				closable={false}
				title={Title}
				open={showModal}
				wrapClassName='dark:bg-modalOverlayDark'
				footer={[
					<Button
						htmlType='submit'
						key='disable'
						onClick={handleSubmit}
						disabled={loading}
<<<<<<< HEAD
						className='rounded-lg font-semibold text-md leading-7 text-pink_primary py-5 outline-none border-solid border-pink_primary px-7 inline-flex items-center justify-center bg-white dark:bg-section-dark-overlay'
=======
						className='text-md inline-flex items-center justify-center rounded-lg border-solid border-pink_primary bg-white px-7 py-5 font-semibold leading-7 text-pink_primary outline-none'
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
					>
						Disable
					</Button>,
					<Button
						key='cancel'
						onClick={dismissModal}
						className='text-md inline-flex items-center justify-center rounded-lg border-none bg-pink_primary px-7 py-5 font-semibold leading-7 text-white outline-none'
						disabled={loading}
					>
						Cancel
					</Button>
				]}
			>
				{currentUser.is2FAEnabled ? (
					<Spin
						spinning={loading}
						indicator={
							<LoadingOutlined
								style={{ fontSize: 24 }}
								spin
							/>
						}
					>
						{error && !loading && (
							<div className='mb-4'>
								<FilteredError text={error || 'Error in disabling two factor auth. Please reload and try again.'} />
							</div>
						)}

<<<<<<< HEAD
						<section className='text-center my-10 dark:text-blue-dark-medium'>
=======
						<section className='my-10 text-center'>
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
							<p className='mb-3'>Are you sure you want to disable two factor authentication ?</p>
							<small>
								<em>Note: Please remember to remove the auth account from your authenticator app too</em>
							</small>
						</section>
					</Spin>
<<<<<<< HEAD
					: <section className='text-center my-10 dark:text-white'>Two factor authentication disabled successfully.</section>
				}
=======
				) : (
					<section className='my-10 text-center'>Two factor authentication disabled successfully.</section>
				)}
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
			</Modal>

			<Button
				onClick={() => setShowModal(true)}
<<<<<<< HEAD
				htmlType="submit"
				className='w-full bg-[#F6F7F9] dark:bg-section-dark-container text-blue-light-high dark:text-blue-dark-high text-left h-full p-[16px] border-[#D2D8E0] dark:border-separatorDark'
			>
				<span className='flex align-center text-[16px] font-medium dark:text-blue-dark-high'>Disable Two Factor Authentication <KeyboardDownIcon/></span>
				<span className='block text-[14px] dark:text-blue-dark-high'>Disabling two-factor authentication may compromise the security of your account.</span>
=======
				htmlType='submit'
				className='h-full w-full border-[#D2D8E0] bg-[#F6F7F9] p-[16px] text-left text-[#243A57]'
			>
				<span className='align-center flex text-[16px] font-medium'>
					Disable Two Factor Authentication <KeyboardDownIcon />
				</span>
				<span className='block text-[14px]'>Disabling two-factor authentication may compromise the security of your account.</span>
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
			</Button>
		</>
	);
};

export default Disable2FA;

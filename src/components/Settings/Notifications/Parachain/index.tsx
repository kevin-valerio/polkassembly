// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { useState } from 'react';
import { Checkbox, Divider, Space } from 'antd';
import { CollapseIcon, ExpandIcon } from '~src/ui-components/CustomIcons';
import ParachainNotification from '~assets/icons/parachain-notification-icon.svg';
import ImportIcon from '~assets/icons/import-icon.svg';
import DisabledImportIcon from '~assets/icons/disabled-state-import-icon.svg';
import NetworkTags from './NetworkTags';
import { chainProperties } from '~src/global/networkConstants';
import { useNetworkContext } from '~src/context';
import AddNetworkModal from './AddNetworkModal';
import ImportPrimaryNetworkSettingModal from './ImportPrinaryBetwork';
import SetPrimaryNetworkSettingModal from './PrimaryNetworkConfirmModal';
import { ISelectedNetwork } from '../types';
import Image from 'next/image';
import { Collapse } from '../common-ui/Collapse';
import { useTheme } from 'next-themes';

const { Panel } = Collapse;
type Props = {
	primaryNetwork: string;
	onSetPrimaryNetwork: (network: string) => Promise<void>;
	onSetNetworkPreferences: (networks: Array<string>) => Promise<void>;
	onCopyPrimaryNetworkNotification: (selectedNetwork: Array<string>) => Promise<void>;
	selectedNetwork: ISelectedNetwork;
	setSelectedNetwork: React.Dispatch<React.SetStateAction<ISelectedNetwork>>;
};

// eslint-disable-next-line no-empty-pattern
export default function Parachain({ primaryNetwork, onSetPrimaryNetwork, onSetNetworkPreferences, onCopyPrimaryNetworkNotification, selectedNetwork, setSelectedNetwork }: Props) {
	const { network } = useNetworkContext();
	const [openModal, setOpenModal] = useState(false);
	const [active, setActive] = useState<boolean | undefined>(false);
	const { resolvedTheme:theme } = useTheme();
	const handleModalConfirm = (networks: ISelectedNetwork) => {
		setSelectedNetwork(networks);
		setOpenModal(false);
		onSetNetworkPreferences(
			Object.values(networks)
				.flatMap((chain) => chain)
				.filter((net: any) => net.selected)
				.map((net) => net.name)
		);
	};

	const [copyPreferencesModal, setCopyPreferencesModal] = useState(false);
	const [primaryPreferencesModal, setPrimaryPreferencesModal] = useState(false);

	const handlePrimaryNetworkChange = () => {
		onSetPrimaryNetwork(network);
		setPrimaryPreferencesModal(false);
	};

	const handleClose = (name: string) => {
		const networks = selectedNetwork[chainProperties[name].category].map((net) => (net.name == name ? { ...net, selected: false } : net));
		setSelectedNetwork({
			...selectedNetwork,
			[chainProperties[name].category]: networks
		});
	};

	const selectedNetworkArray = Object.values(selectedNetwork)
		.flatMap((chain) => chain)
		.filter(({ selected }: { selected: boolean }) => selected);

	return (
		<Collapse
			className='bg-white dark:bg-section-dark-overlay dark:border-[#90909060]'
			size='large'
			theme={theme}
			expandIconPosition='end'
			expandIcon={({ isActive }) => {
				setActive(isActive);
				return isActive ? <CollapseIcon className='text-lightBlue dark:text-blue-dark-medium' /> : <ExpandIcon className='text-lightBlue dark:text-blue-dark-medium'/>;
			}}
		>
			<Panel
				header={
					<div className='flex items-center justify-between gap-[8px]'>
						<div className='channel-header flex items-center gap-[6px]'>
							<ParachainNotification />
<<<<<<< HEAD
							<h3 className='font-semibold text-[16px] text-blue-light-high dark:text-blue-dark-high md:text-[18px] tracking-wide leading-[21px] mb-0'>
								Parachains
							</h3>
=======
							<h3 className='mb-0 text-[16px] font-semibold leading-[21px] tracking-wide text-[#243A57] md:text-[18px]'>Parachains</h3>
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
						</div>
						{!!active && (
							<div className='hidden gap-2 md:flex'>
								{selectedNetworkArray.slice(0, 5).map((net) => (
									<Image
										key={net.name}
										className='h-[20px] w-[20px] rounded-full'
										src={chainProperties[net.name].logo}
										alt='Logo'
									/>
								))}
								{selectedNetworkArray.length > 5 && <span className='rounded-xl bg-[#D2D8E080] px-2 py-[3px] text-[10px]'>+{selectedNetworkArray.length - 5}</span>}
							</div>
						)}
					</div>
				}
				key={13}
			>
				<Space
					size={[16, 16]}
					wrap
				>
					{selectedNetworkArray.map(({ name }: { name: string }) => (
						<NetworkTags
							key={name}
							icon={chainProperties[name].logo}
							name={name}
							onClose={name === network ? undefined : handleClose}
						/>
					))}
					<NetworkTags
						name={'Add Networks'}
						selected={false}
						onActionClick={() => setOpenModal(true)}
					/>
				</Space>
<<<<<<< HEAD
				<Divider className='border-[#D2D8E0] dark:border-separatorDark border-2' dashed />
				<div className='flex flex-col item-center gap-6'>
=======
				<Divider
					className='border-2 border-[#D2D8E0]'
					dashed
				/>
				<div className='item-center flex flex-col gap-6'>
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29
					<Checkbox
						value={false}
						onChange={() => {
							if (primaryNetwork === network) {
								return;
							}
							setPrimaryPreferencesModal(true);
						}}
						checked={primaryNetwork === network}
						className='item-center flex text-[16px] text-pink_primary'
					>
						Set as Primary Network Settings
					</Checkbox>
					<div
						className={`item-center flex max-w-[300px] gap-2 text-[16px] ${
							primaryNetwork !== network ? 'cursor-pointer text-pink_primary' : 'cursor-not-allowed text-[#96A4B6]'
						} whitespace-normal md:whitespace-nowrap`}
					>
						<span
							onClick={
								primaryNetwork !== network
									? () => {
											setCopyPreferencesModal(true);
									  }
									: () => {}
							}
						>
							{primaryNetwork !== network ? <ImportIcon /> : <DisabledImportIcon />}
						</span>
						Importing Primary Network Settings
					</div>
				</div>
			</Panel>
			<AddNetworkModal
				open={openModal}
				onConfirm={handleModalConfirm}
				onCancel={() => setOpenModal(false)}
				selectedNetwork={selectedNetwork}
			/>
			{primaryNetwork && (
				<ImportPrimaryNetworkSettingModal
					open={copyPreferencesModal}
					primaryNetwork={primaryNetwork}
					onConfirm={() => {
						if (!primaryNetwork) {
							return;
						}
						onCopyPrimaryNetworkNotification(
							Object.values(selectedNetwork)
								.flatMap((chain) => chain)
								.filter((network) => network.selected)
								.map(({ name }: { name: string }) => name)
						);
						setCopyPreferencesModal(false);
					}}
					onCancel={() => setCopyPreferencesModal(false)}
				/>
			)}
			<SetPrimaryNetworkSettingModal
				open={primaryPreferencesModal}
				network={network}
				onConfirm={handlePrimaryNetworkChange}
				onCancel={() => setPrimaryPreferencesModal(false)}
			/>
		</Collapse>
	);
}

// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import { Card, Col, Dropdown, Row } from 'antd';
import Image from 'next/image';
import React, { FC, useState } from 'react';
import { chainProperties, network } from 'src/global/networkConstants';
import { useNetworkContext } from '~src/context';
import { ArrowDownIcon } from './CustomIcons';
import { isOpenGovSupported } from '~src/global/openGovNetworks';
import { useRouter } from 'next/router';
import DownOutlined from '~assets/search/dropdown-down.svg';
import chainLogo from '~assets/parachain-logos/chain-logo.jpg';
import HightlightDownOutlined from '~assets/search/pink-dropdown-down.svg';

type DropdownMenuItemType = {
	key: any;
	label: any;
	link: string;
}

const polkadotChains: DropdownMenuItemType[] = [];
const kusamaChains: DropdownMenuItemType[] = [];
const soloChains: DropdownMenuItemType[] = [];
const testChains: DropdownMenuItemType[] = [];

let link = '';

for (const key of Object.keys(network)) {
	const keyVal = network[key as keyof typeof network];
	if(key === 'TANGANIKA') continue;

	link = ['MOONBASE', 'MOONRIVER', 'MOONBEAM', 'KILT'].includes(key) ? `https://${key}.polkassembly.network` : `https://${key === 'POLYMESHTEST'? 'polymesh-test': keyVal}.polkassembly.io`;

	if (isOpenGovSupported(keyVal)) {
		link = `${link}/opengov`;
	}
	const optionObj: DropdownMenuItemType = {
		key,
		label: <div className='flex items-center my-2'>
			<Image
				className='w-5 h-5 mr-3 object-contain rounded-full'
				src={chainProperties[keyVal]?.logo ? chainProperties[keyVal].logo : chainLogo}
				alt='Logo'
			/>
			<span className='capitalize'> {keyVal == 'hydradx' ? 'HydraDX' : keyVal} </span>
		</div>,
		link
	};

	switch(chainProperties[keyVal]?.category) {
	case 'polkadot':
		polkadotChains.push(optionObj);
		break;
	case 'kusama':
		kusamaChains.push(optionObj);
		break;
	case 'test':
		testChains.push(optionObj);
		break;
	default:
		soloChains.push(optionObj);
	}
}

interface INetworkDropdown {
	setSidedrawer: React.Dispatch<React.SetStateAction<boolean>>;
	isSmallScreen?: boolean;
  isSearch?: boolean;
  setSelectedNetworks?: (pre: string[]) => void;
  selectedNetworks?: string[];
  allowedNetwork?: string[];
}

const NetworkDropdown: FC<INetworkDropdown> = (props) => {
	const { isSmallScreen, setSidedrawer, isSearch, setSelectedNetworks, selectedNetworks = [], allowedNetwork } = props;
	const { network } = useNetworkContext();
	const [openFilter, setOpenFilter] = useState<boolean>(false);
	const router = useRouter();

	const handleLink = (option: DropdownMenuItemType) => {

		setOpenFilter(false);
		if(isSearch && setSelectedNetworks && selectedNetworks){
			if(!allowedNetwork?.includes(option.key)) return ;
			const filterArr = selectedNetworks.filter((network) => network !== option?.key);
			if(filterArr?.length < selectedNetworks.length){
				setSelectedNetworks([...filterArr]);
			}else{
				setSelectedNetworks([...selectedNetworks, option.key]);}
		}
		else {
			router.push(option.link);
		}
	};

	return (
		<Dropdown
			open={openFilter}
			onOpenChange={() => setOpenFilter(!openFilter)}
			placement={'bottomLeft'}
			trigger={[isSearch ? 'hover' :'click']}
			dropdownRender={() => {
				return (
					<Card className='max-w-[356px] max-h-[52vh] overflow-y-auto dark:bg-section-dark-overlay dark:border-none'>
						<>
							<div className='text-blue-light-high dark:text-blue-dark-high font-medium'>Polkadot &amp; Parachains</div>
							<Row className="mt-2">
								{
									polkadotChains.map(optionObj => (
										<Col span={12} key={optionObj.key} className={`flex ${!isSearch && 'cursor-pointer dark:text-blue-dark-high'} ${isSearch && selectedNetworks?.includes(optionObj.key) && 'text-pink_primary font-medium cursor-pointer'} ${isSearch && !allowedNetwork?.includes(optionObj?.key) && 'text-[#B5BFCC] cursor-not-allowed'}`} onClick={() => handleLink(optionObj) }>{optionObj.label}</Col>
									))
								}
							</Row>

							<div className='text-blue-light-high dark:text-blue-dark-high font-medium mt-4'>Kusama &amp; Parachains</div>
							<Row className="mt-2">
								{
									kusamaChains.map(optionObj => (
										<Col span={12} key={optionObj.key} className={`flex ${!isSearch && 'cursor-pointer dark:text-blue-dark-high'} ${isSearch && selectedNetworks?.includes(optionObj.key) && 'text-pink_primary font-medium cursor-pointer'} ${isSearch && !allowedNetwork?.includes(optionObj?.key) && 'text-[#B5BFCC] cursor-not-allowed'}`} onClick={() => handleLink(optionObj) }>{optionObj.label}</Col>
									))
								}
							</Row>

							<div className='text-blue-light-high dark:text-blue-dark-high font-medium mt-4'>Solo Chains</div>
							<Row className="mt-2">
								{
									soloChains.map(optionObj => (
										<Col span={12} key={optionObj.key} className={`flex ${!isSearch && 'cursor-pointer dark:text-blue-dark-high'} ${isSearch && selectedNetworks?.includes(optionObj.key) && 'text-pink_primary font-medium cursor-pointer'} ${isSearch && !allowedNetwork?.includes(optionObj?.key) && 'text-[#B5BFCC] cursor-not-allowed'}`}  onClick={() => handleLink(optionObj) }>{optionObj.label}</Col>
									))
								}
							</Row>

							<div className='text-blue-light-high dark:text-blue-dark-high font-medium mt-4'>Test Chains</div>
							<Row className="mt-2">
								{
									testChains.map(optionObj => (
										<Col span={12} key={optionObj.key} className={`flex ${!isSearch && 'cursor-pointer dark:text-blue-dark-high'} ${isSearch && selectedNetworks?.includes(optionObj.key) && 'text-pink_primary font-medium cursor-pointer'} ${isSearch && !allowedNetwork?.includes(optionObj?.key) && 'text-[#B5BFCC] cursor-not-allowed'}`} onClick={() => handleLink(optionObj) }>{optionObj.label}</Col>
									))
								}
							</Row>
						</>
					</Card>
				);}
			}
		>
			{isSearch ? <div className={`flex items-center justify-center text-xs dark:text-blue-dark-high cursor-pointer ${(openFilter || selectedNetworks.length > 0 ) && 'text-pink_primary' } max-sm:text-[10px]`}>
                             Network
				<span className='text-[#96A4B6]'>
					{openFilter ? <HightlightDownOutlined className='ml-2.5 mt-1 max-md:ml-1'/> :<DownOutlined className='ml-2.5 max-md:ml-1 mt-1'/>}
				</span>
			</div>
				:
				isSmallScreen?
					<a className='flex items-center justify-between gap-x-2 rounded-[4px] border border-solid border-[#D2D8E0] bg-[rgba(210,216,224,0.2)] h-10 px-[18px]' onClick={e => {
						e.preventDefault();
						setSidedrawer(false);
					}}
					>
						<div className='flex items-center gap-x-[6px] border-solid'>
							<Image
								className='w-[20px] h-[20px] rounded-full'
								src={chainProperties[network]?.logo ? chainProperties[network]?.logo : chainLogo}
								alt='Logo'
							/>
							<span className='font-semibold text-xs leading-[18px] tracking-[0.02em] text-blue-light-high dark:text-blue-dark-high capitalize'>
								{
									network
								}
							</span>
						</div>
						<span className='text-[#485F7D]'>
							<ArrowDownIcon />
						</span>
					</a>
					: <a className='flex items-center justify-between text-blue-light-high dark:text-blue-dark-high hover:text-pink_primary lg:min-w-[133px] lg:h-8 lg:border-solid lg:border lg:border-[#D2D8E0] lg:rounded-[26px] lg:bg-[rgba(210,216,224,0.2)] lg:px-[12px] lg:py-[6px]' onClick={e => {
						e.preventDefault();
						setSidedrawer(false);
					}}
					>
						<Image
							className='w-[20px] h-[20px] rounded-full'
							src={chainProperties[network]?.logo ? chainProperties[network]?.logo : chainLogo}
							alt='Logo'
						/>
						<span className='hidden lg:flex lg:items-center lg:justify-center lg:ml-[9.25px] lg:mr-[13.35px] font-semibold text-blue-light-high dark:text-blue-dark-high text-xs leading-[18px] tracking-[0.02em] capitalize'>
							{
								network
							}
						</span>
						<span className='hidden lg:flex lg:items-center lg:justify-center text-[#485F7D]'>
							<ArrowDownIcon />
						</span>
					</a>
			}

		</Dropdown>
	);
};

export default NetworkDropdown;
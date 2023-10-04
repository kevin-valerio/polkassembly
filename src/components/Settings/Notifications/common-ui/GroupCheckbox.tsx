// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import { Checkbox, Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import Tips from '~assets/icons/tips.svg';
import Toggler from './Toggler';
type Props = {
	categoryOptions: any;
	title?: string;
	classname?: string;
	Icon?: any;
	onChange: any;
	handleCategoryAllClick?: any;
};

export default function GroupCheckbox({ categoryOptions = [], title, classname, Icon, onChange, handleCategoryAllClick }: Props) {
	const [all, setAll] = useState(false);

	const handleAllClick = (checked: boolean) => {
		handleCategoryAllClick(checked, categoryOptions, title);
		setAll(checked);
	};

	useEffect(() => {
		setAll(categoryOptions.every((category: any) => category.selected));
	}, [categoryOptions]);

	const handleChange = (e: any, value: any) => {
		setAll(false);
		onChange(categoryOptions, e.target.checked, value, title || '');
	};

	return (
		<div className={classname}>
			{!!title && (
<<<<<<< HEAD
				<div className='flex items-center gap-[8px] mb-[16px] text-blue-light-high dark:text-blue-dark-high'>
					{title && Icon ? (
						<Icon />
					) : (
						<Tips className='w-[20px] h-[20px]' />
					)}
=======
				<div className='mb-[16px] flex items-center gap-[8px] text-[#243A57]'>
					{title && Icon ? <Icon /> : <Tips className='h-[20px] w-[20px]' />}
>>>>>>> 540916d451d46767ebc2e85c3f2c900218f76d29

					<h3 className='mb-[1px] text-[14px] font-semibold leading-[21px] tracking-wide'>{title}</h3>
					<Toggler
						selected={all}
						label='All'
						onClick={(checked: boolean) => handleAllClick(checked)}
					/>
				</div>
			)}
			<div className='flex flex-col gap-[19px] text-blue-light-high dark:text-blue-dark-high'>
				{categoryOptions.map((item: any) => (
					<Row
						key={item.value}
						style={{ display: 'block' }}
					>
						<Col>
							<Checkbox
								value={item.value}
								name={item.value}
								onChange={(e) => handleChange(e, item.value)}
								checked={item.selected}
								className='text-blue-light-high dark:text-blue-dark-high'
							>
								{item.label}
							</Checkbox>
						</Col>
					</Row>
				))}
			</div>
		</div>
	);
}

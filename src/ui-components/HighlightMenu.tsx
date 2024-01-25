// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React, { useState, useEffect, useRef } from 'react';
import QuoteIcon from '~assets/icons/quote-icon.svg';
import TwitterIcon from '~assets/icons/twitter.svg';

interface IHiglightMenuProps {
	markdownRef: React.RefObject<HTMLDivElement>;
}
const HighlightMenu = ({ markdownRef }: IHiglightMenuProps) => {
	const [selectedText, setSelectedText] = useState('');
	const [menuPosition, setMenuPosition] = useState({ left: 0, top: 0 });
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const markdown = markdownRef.current;

		if (!markdown) return;

		const handleSelection = () => {
			const selection = window.getSelection();
			const text = selection?.toString().trim();

			if (text !== '') {
				const range = selection?.getRangeAt(0);
				const rect = range?.getBoundingClientRect();

				if (rect) {
					setMenuPosition({
						left: rect.left + rect.width / 2 - 40,
						top: rect.top - 180
					});
				}

				text && setSelectedText(text);
			}
		};

		const clearSelection = () => {
			if (selectedText) {
				document.getSelection()?.removeAllRanges();
				setTimeout(() => {
					setSelectedText('');
				}, 250);
			}
		};

		markdown?.addEventListener('pointerup', handleSelection);
		document?.addEventListener('pointerdown', clearSelection);

		return () => {
			markdown?.removeEventListener('pointerup', handleSelection);
			document?.removeEventListener('pointerdown', clearSelection);
		};
	}, [markdownRef, selectedText]);

	const shareSelection = (event: React.MouseEvent) => {
		window.open(`https://twitter.com/intent/tweet?text=${selectedText}`, '_blank');
		event.stopPropagation();
		setSelectedText('');
	};

	return (
		<div
			ref={menuRef}
			className={`fixed z-[999] ${
				selectedText ? 'block' : 'hidden'
			} flex flex-col gap-1 rounded-md bg-[#363636] p-2 text-xs after:absolute after:left-[70%] after:top-[40px] after:-z-10 after:h-4 after:w-4 after:-translate-x-1/2 after:rotate-45 after:transform after:border-8 after:border-solid after:border-[#363636] after:content-['']`}
			style={{ left: menuPosition.left, top: menuPosition.top - 10 }}
		>
			<div className='flex h-4 cursor-pointer gap-1'>
				<QuoteIcon className='w-3' />
				Quote
			</div>
			<div
				className='flex h-4 cursor-pointer gap-1'
				onClick={shareSelection}
			>
				<TwitterIcon className='w-3 fill-white' />
				Share
			</div>
		</div>
	);
};

export default HighlightMenu;
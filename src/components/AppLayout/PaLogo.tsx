// Copyright 2019-2025 @polkassembly/polkassembly authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.
import React, { FC } from 'react';
import { useTheme } from 'next-themes';
import { IPaLogo } from './type';

const PaLogo: FC<IPaLogo> = (props) => {
	const { className, sidedrawer = true } = props;
	const { resolvedTheme: theme } = useTheme();
	return sidedrawer ? (
		<svg
			width='149'
			height='40'
			viewBox='0 0 149 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M4.08895 24.9033C4.90225 27.5289 6.32553 29.8097 8.26155 31.7368C10.5423 34.0176 13.2651 35.5293 16.4123 36.2719C17.7648 36.5901 19.1351 36.7669 20.5141 36.7404C22.9364 36.6962 25.2525 36.1746 27.4626 35.158C29.4074 34.2651 31.1048 33.0364 32.5811 31.4981C32.7932 31.2771 32.917 31.2418 33.1645 31.4805C33.7745 32.0728 34.411 32.6385 35.0387 33.2043C35.2243 33.3634 35.2332 33.4607 35.0563 33.6552C32.0418 36.82 28.382 38.7914 24.1033 39.6489C22.3883 39.9936 20.6467 40.0643 18.914 39.9494C16.483 39.7903 14.1403 39.1892 11.9126 38.1725C9.62294 37.1382 7.59853 35.7238 5.857 33.9381C3.65578 31.6838 1.99381 29.0759 1.03906 26.0526C1.61368 25.7166 2.25902 25.6017 2.87783 25.3719C3.28449 25.2216 3.71766 25.1243 4.09779 24.9033H4.08895Z'
				fill='#FC85C6'
			/>
			<path
				d='M14.4597 30.3222C11.2064 28.4481 9.12898 25.69 8.40408 22.0036C7.78526 18.883 8.32452 15.9303 10.0307 13.2252C11.7457 10.5201 14.1591 8.7432 17.262 7.91221C17.3151 7.89453 17.3681 7.90337 17.4211 7.89453C17.5714 8.00945 17.5979 8.1951 17.6421 8.36306C17.8101 9.01724 17.9692 9.68026 18.1107 10.3433C18.1637 10.582 18.2433 10.8118 18.3936 11.0151C17.2355 11.245 16.1747 11.7047 15.2288 12.3942C12.9833 14.0473 11.6573 16.2397 11.4716 19.0598C11.2772 21.871 12.2496 24.2313 14.2652 26.1762C14.7867 26.6801 15.379 27.1044 16.0067 27.4668C16.0067 27.7497 15.8122 27.9442 15.6796 28.1652C15.2553 28.8813 14.9105 29.6415 14.4508 30.3311L14.4597 30.3222Z'
				fill='#FC85C6'
			/>
			<path
				d='M10.501 6.72766C12.6757 5.10105 15.1068 4.0579 17.7942 3.62473C19.8982 3.27996 21.9934 3.38604 24.062 3.87226C26.5019 4.44687 28.6854 5.53422 30.6303 7.12547C31.364 7.72661 32.0359 8.38962 32.6547 9.10568C32.8315 9.30901 32.7785 9.40625 32.5928 9.55654C31.8944 10.1135 31.2049 10.6792 30.5419 11.2627C30.3209 11.4572 30.2413 11.3069 30.1175 11.1831C29.2689 10.2638 28.3672 9.41509 27.2975 8.74323C25.6267 7.69124 23.8144 7.03707 21.8519 6.81606C18.4307 6.42709 15.3455 7.29343 12.552 9.29133C12.2779 9.18525 12.1807 8.9112 12.0127 8.69903C11.5088 8.04485 11.058 7.34648 10.4922 6.7365L10.501 6.72766Z'
				fill='#FC85C6'
			/>
			<path
				d='M10.4983 6.72695C10.6663 6.68275 10.737 6.80651 10.8166 6.92143C11.3912 7.70822 11.9746 8.495 12.5493 9.28178C11.0199 10.4752 9.7469 11.8897 8.85403 13.6223C7.22743 16.7518 6.92686 20.0227 7.89044 23.4173C7.93464 23.5588 7.96117 23.7091 7.99653 23.8505C7.81088 24.0273 7.55451 24.045 7.32467 24.1246C6.53789 24.4074 5.73342 24.6285 4.96432 24.9379C4.22174 22.8869 3.95653 20.7653 4.10682 18.5906C4.36318 14.8511 5.76878 11.5891 8.25289 8.78673C8.92475 8.02647 9.68502 7.35461 10.4895 6.73579L10.4983 6.72695Z'
				fill='#E2007A'
			/>
			<path
				d='M4.96526 24.9291C4.98295 24.8231 5.03599 24.77 5.14207 24.7347C6.02609 24.4429 6.91012 24.1424 7.80298 23.8506C7.86487 23.833 7.93559 23.8506 8.00631 23.8418C8.47484 25.0352 9.00526 26.1845 9.77436 27.2188C12.3027 30.6223 15.6885 32.4345 19.923 32.6378C20.2147 32.6555 20.3296 32.7086 20.3208 33.0268C20.3031 33.8755 20.3119 34.7241 20.3296 35.5816C20.3296 35.8645 20.2412 35.9264 19.976 35.9264C13.3723 35.7761 7.54662 31.6831 5.15975 25.5214C5.08903 25.3358 4.95642 25.159 4.96526 24.9468V24.9291Z'
				fill='#C10061'
			/>
			<path
				d='M1.95025 11.006C2.69283 9.32639 3.70946 7.81471 4.90289 6.43563C7.63453 3.27966 11.0115 1.14916 15.0338 0.0352855C15.3609 -0.0531171 15.4581 0.0176049 15.5289 0.327014C15.6968 1.10496 15.8825 1.87406 16.1035 2.63432C16.2007 2.98793 16.1565 3.13821 15.7764 3.23546C13.4337 3.85427 11.3386 4.95931 9.4733 6.49751C7.51076 8.12411 5.97256 10.0778 4.89405 12.3851C4.87637 12.4205 4.84985 12.4558 4.82333 12.4824C4.21335 12.0403 3.48845 11.8105 2.81659 11.4834C2.51602 11.3331 2.17125 11.2536 1.94141 10.9884L1.95025 11.006Z'
				fill='#FC4D9D'
			/>
			<path
				d='M1.95114 11.0059C2.844 11.4125 3.72803 11.8192 4.62089 12.217C4.74466 12.27 4.81538 12.3673 4.83306 12.491C3.78991 14.8248 3.23297 17.2559 3.25949 19.8107C3.27717 21.5434 3.56006 23.2408 4.09048 24.8939C4.09048 25.0088 4.03744 25.1061 3.91367 25.1414C2.95008 25.4243 2.01302 25.8133 1.04059 26.052C-0.586016 20.9777 -0.303127 16.0094 1.87157 11.1473C1.8981 11.0943 1.92462 11.0501 1.95114 11.0059Z'
				fill='#E2007A'
			/>
			<path
				d='M14.4581 30.3218C14.4404 30.0389 14.6437 29.8444 14.7675 29.6234C15.1741 28.8985 15.5277 28.1382 16.0051 27.4575C18.666 28.8366 21.3711 28.9427 24.1116 27.7051C24.6509 27.4575 25.1548 27.157 25.6145 26.7857C25.8001 26.6354 25.8973 26.6619 26.0388 26.8476C26.5692 27.5283 27.1085 28.209 27.6566 28.8631C27.851 29.1018 27.8422 29.2168 27.5947 29.4024C24.4741 31.6567 21.044 32.3374 17.3046 31.4533C16.2968 31.2147 15.3509 30.8257 14.4492 30.3218H14.4581Z'
				fill='#E2007A'
			/>
			<path
				d='M18.3943 11.0061C18.1821 11.015 18.1291 10.8647 18.0937 10.6967C17.8727 9.75967 17.6429 8.8226 17.4219 7.88554C19.6054 7.31092 21.7713 7.417 23.9283 8.04466C24.2907 8.15075 24.335 8.28335 24.2023 8.61044C23.9018 9.3707 23.6366 10.1486 23.3802 10.9266C23.2918 11.1918 23.1946 11.2537 22.9205 11.1653C21.6475 10.7675 20.348 10.6791 19.0308 10.8559C18.8186 10.8824 18.6241 11.0238 18.4031 10.9885L18.3943 11.0061Z'
				fill='#E2007A'
			/>
			<path
				d='M26.854 18.168C26.854 18.6627 26.7373 19.1293 26.504 19.568C26.2707 20.0067 25.8973 20.366 25.384 20.646C24.8707 20.9167 24.2127 21.052 23.41 21.052H21.646V25H20.05V15.27H23.41C24.1567 15.27 24.7867 15.4007 25.3 15.662C25.8227 15.914 26.21 16.2593 26.462 16.698C26.7233 17.1367 26.854 17.6267 26.854 18.168ZM23.41 19.75C24.0167 19.75 24.4693 19.6147 24.768 19.344C25.0667 19.064 25.216 18.672 25.216 18.168C25.216 17.104 24.614 16.572 23.41 16.572H21.646V19.75H23.41ZM32.8142 25.098C31.9088 25.098 31.0735 24.888 30.3082 24.468C29.5522 24.0387 28.9502 23.446 28.5022 22.69C28.0635 21.9247 27.8442 21.066 27.8442 20.114C27.8442 19.162 28.0635 18.308 28.5022 17.552C28.9502 16.796 29.5522 16.208 30.3082 15.788C31.0735 15.3587 31.9088 15.144 32.8142 15.144C33.7288 15.144 34.5642 15.3587 35.3202 15.788C36.0855 16.208 36.6875 16.796 37.1262 17.552C37.5648 18.308 37.7842 19.162 37.7842 20.114C37.7842 21.066 37.5648 21.9247 37.1262 22.69C36.6875 23.446 36.0855 24.0387 35.3202 24.468C34.5642 24.888 33.7288 25.098 32.8142 25.098ZM32.8142 23.712C33.4582 23.712 34.0322 23.5673 34.5362 23.278C35.0402 22.9793 35.4322 22.5593 35.7122 22.018C36.0015 21.4673 36.1462 20.8327 36.1462 20.114C36.1462 19.3953 36.0015 18.7653 35.7122 18.224C35.4322 17.6827 35.0402 17.2673 34.5362 16.978C34.0322 16.6887 33.4582 16.544 32.8142 16.544C32.1702 16.544 31.5962 16.6887 31.0922 16.978C30.5882 17.2673 30.1915 17.6827 29.9022 18.224C29.6222 18.7653 29.4822 19.3953 29.4822 20.114C29.4822 20.8327 29.6222 21.4673 29.9022 22.018C30.1915 22.5593 30.5882 22.9793 31.0922 23.278C31.5962 23.5673 32.1702 23.712 32.8142 23.712ZM40.9507 23.712H44.2407V25H39.3547V15.27H40.9507V23.712ZM50.9374 25L47.1714 20.646V25H45.5754V15.27H47.1714V19.708L50.9514 15.27H52.9534L48.7254 20.142L53.0234 25H50.9374ZM60.3008 23.012H56.2268L55.5268 25H53.8608L57.3468 15.256H59.1948L62.6808 25H61.0008L60.3008 23.012ZM59.8528 21.71L58.2708 17.188L56.6748 21.71H59.8528ZM67.4025 25.098C66.7492 25.098 66.1612 24.986 65.6385 24.762C65.1158 24.5287 64.7052 24.202 64.4065 23.782C64.1078 23.362 63.9585 22.872 63.9585 22.312H65.6665C65.7038 22.732 65.8672 23.0773 66.1565 23.348C66.4552 23.6187 66.8705 23.754 67.4025 23.754C67.9532 23.754 68.3825 23.6233 68.6905 23.362C68.9985 23.0913 69.1525 22.746 69.1525 22.326C69.1525 21.9993 69.0545 21.7333 68.8585 21.528C68.6718 21.3227 68.4338 21.164 68.1445 21.052C67.8645 20.94 67.4725 20.8187 66.9685 20.688C66.3338 20.52 65.8158 20.352 65.4145 20.184C65.0225 20.0067 64.6865 19.736 64.4065 19.372C64.1265 19.008 63.9865 18.5227 63.9865 17.916C63.9865 17.356 64.1265 16.866 64.4065 16.446C64.6865 16.026 65.0785 15.704 65.5825 15.48C66.0865 15.256 66.6698 15.144 67.3325 15.144C68.2752 15.144 69.0452 15.382 69.6425 15.858C70.2492 16.3247 70.5852 16.9687 70.6505 17.79H68.8865C68.8585 17.4353 68.6905 17.132 68.3825 16.88C68.0745 16.628 67.6685 16.502 67.1645 16.502C66.7072 16.502 66.3338 16.6187 66.0445 16.852C65.7552 17.0853 65.6105 17.4213 65.6105 17.86C65.6105 18.1587 65.6992 18.406 65.8765 18.602C66.0632 18.7887 66.2965 18.938 66.5765 19.05C66.8565 19.162 67.2392 19.2833 67.7245 19.414C68.3685 19.5913 68.8912 19.7687 69.2925 19.946C69.7032 20.1233 70.0485 20.3987 70.3285 20.772C70.6178 21.136 70.7625 21.626 70.7625 22.242C70.7625 22.7367 70.6272 23.2033 70.3565 23.642C70.0952 24.0807 69.7078 24.4353 69.1945 24.706C68.6905 24.9673 68.0932 25.098 67.4025 25.098ZM75.8517 25.098C75.1984 25.098 74.6104 24.986 74.0877 24.762C73.565 24.5287 73.1544 24.202 72.8557 23.782C72.557 23.362 72.4077 22.872 72.4077 22.312H74.1157C74.153 22.732 74.3164 23.0773 74.6057 23.348C74.9044 23.6187 75.3197 23.754 75.8517 23.754C76.4024 23.754 76.8317 23.6233 77.1397 23.362C77.4477 23.0913 77.6017 22.746 77.6017 22.326C77.6017 21.9993 77.5037 21.7333 77.3077 21.528C77.121 21.3227 76.883 21.164 76.5937 21.052C76.3137 20.94 75.9217 20.8187 75.4177 20.688C74.783 20.52 74.265 20.352 73.8637 20.184C73.4717 20.0067 73.1357 19.736 72.8557 19.372C72.5757 19.008 72.4357 18.5227 72.4357 17.916C72.4357 17.356 72.5757 16.866 72.8557 16.446C73.1357 16.026 73.5277 15.704 74.0317 15.48C74.5357 15.256 75.119 15.144 75.7817 15.144C76.7244 15.144 77.4944 15.382 78.0917 15.858C78.6984 16.3247 79.0344 16.9687 79.0997 17.79H77.3357C77.3077 17.4353 77.1397 17.132 76.8317 16.88C76.5237 16.628 76.1177 16.502 75.6137 16.502C75.1564 16.502 74.783 16.6187 74.4937 16.852C74.2044 17.0853 74.0597 17.4213 74.0597 17.86C74.0597 18.1587 74.1484 18.406 74.3257 18.602C74.5124 18.7887 74.7457 18.938 75.0257 19.05C75.3057 19.162 75.6884 19.2833 76.1737 19.414C76.8177 19.5913 77.3404 19.7687 77.7417 19.946C78.1524 20.1233 78.4977 20.3987 78.7777 20.772C79.067 21.136 79.2117 21.626 79.2117 22.242C79.2117 22.7367 79.0764 23.2033 78.8057 23.642C78.5444 24.0807 78.157 24.4353 77.6437 24.706C77.1397 24.9673 76.5424 25.098 75.8517 25.098ZM82.6909 16.558V19.414H86.0509V20.716H82.6909V23.698H86.4709V25H81.0949V15.256H86.4709V16.558H82.6909ZM98.6847 15.27V25H97.0887V18.336L94.1207 25H93.0147L90.0327 18.336V25H88.4367V15.27H90.1587L93.5747 22.9L96.9767 15.27H98.6847ZM105.99 20.002C106.513 20.0953 106.956 20.3707 107.32 20.828C107.684 21.2853 107.866 21.8033 107.866 22.382C107.866 22.8767 107.736 23.3247 107.474 23.726C107.222 24.118 106.854 24.4307 106.368 24.664C105.883 24.888 105.318 25 104.674 25H100.782V15.27H104.492C105.155 15.27 105.724 15.382 106.2 15.606C106.676 15.83 107.036 16.1333 107.278 16.516C107.521 16.8893 107.642 17.3093 107.642 17.776C107.642 18.336 107.493 18.8027 107.194 19.176C106.896 19.5493 106.494 19.8247 105.99 20.002ZM102.378 19.358H104.352C104.875 19.358 105.281 19.2413 105.57 19.008C105.869 18.7653 106.018 18.42 106.018 17.972C106.018 17.5333 105.869 17.1927 105.57 16.95C105.281 16.698 104.875 16.572 104.352 16.572H102.378V19.358ZM104.534 23.698C105.076 23.698 105.5 23.5673 105.808 23.306C106.116 23.0447 106.27 22.6807 106.27 22.214C106.27 21.738 106.107 21.36 105.78 21.08C105.454 20.8 105.02 20.66 104.478 20.66H102.378V23.698H104.534ZM111.197 23.712H114.487V25H109.601V15.27H111.197V23.712ZM123.031 15.27L119.811 21.472V25H118.215V21.472L114.981 15.27H116.759L119.013 20.044L121.267 15.27H123.031Z'
				fill={`${theme === 'dark' ? 'white' : 'black'}`}
			/>
		</svg>
	) : (
		<svg
			className={className}
			width='39'
			height='40'
			viewBox='0 0 39 40'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<g clipPath='url(#clip0_8997_79043)'>
				<path
					d='M6.09501 24.9033C6.90889 27.5289 8.33317 29.8097 10.2706 31.7368C12.553 34.0176 15.2777 35.5293 18.427 36.2719C19.7805 36.5901 21.1518 36.7669 22.5318 36.7404C24.9557 36.6962 27.2735 36.1746 29.4852 35.158C31.4314 34.2651 33.1299 33.0364 34.6073 31.4981C34.8196 31.2771 34.9434 31.2418 35.1911 31.4805C35.8015 32.0728 36.4385 32.6385 37.0666 33.2043C37.2524 33.3634 37.2612 33.4607 37.0843 33.6552C34.0676 36.82 30.4052 38.7914 26.1235 39.6489C24.4073 39.9936 22.6645 40.0644 20.9306 39.9494C18.4978 39.7903 16.1535 39.1892 13.9242 38.1725C11.6329 37.1382 9.60707 35.7238 7.86431 33.9381C5.66153 31.6838 3.99839 29.0759 3.04297 26.0526C3.61799 25.7166 4.26379 25.6017 4.88304 25.3719C5.28998 25.2216 5.72346 25.1243 6.10386 24.9033H6.09501Z'
					fill='#FC85C6'
				/>
				<path
					d='M16.4719 30.3222C13.2164 28.4481 11.1375 25.69 10.4121 22.0036C9.79281 18.883 10.3325 15.9303 12.0398 13.2252C13.756 10.5201 16.1711 8.74319 19.2763 7.91221C19.3293 7.89453 19.3824 7.90337 19.4355 7.89453C19.5859 8.00945 19.6124 8.1951 19.6567 8.36306C19.8247 9.01724 19.984 9.68026 20.1255 10.3433C20.1786 10.582 20.2582 10.8118 20.4086 11.0151C19.2497 11.245 18.1881 11.7047 17.2416 12.3942C14.9946 14.0473 13.6676 16.2397 13.4818 19.0598C13.2872 21.871 14.2603 24.2313 16.2773 26.1762C16.7992 26.6801 17.392 27.1044 18.0201 27.4668C18.0201 27.7497 17.8254 27.9442 17.6927 28.1652C17.2681 28.8813 16.9231 29.6415 16.4631 30.3311L16.4719 30.3222Z'
					fill='#FC85C6'
				/>
				<path
					d='M12.5088 6.72766C14.6851 5.10105 17.1179 4.0579 19.8072 3.62473C21.9127 3.27996 24.0093 3.38604 26.0794 3.87226C28.521 4.44687 30.7061 5.53422 32.6523 7.12547C33.3866 7.72661 34.0589 8.38962 34.6782 9.10568C34.8551 9.30901 34.802 9.40625 34.6162 9.55654C33.9174 10.1135 33.2273 10.6792 32.5639 11.2627C32.3427 11.4572 32.2631 11.3069 32.1392 11.1831C31.29 10.2638 30.3876 9.41509 29.3172 8.74323C27.6452 7.69124 25.8317 7.03707 23.8677 6.81606C20.4442 6.42709 17.3567 7.29343 14.5612 9.29133C14.287 9.18525 14.1897 8.9112 14.0216 8.69903C13.5173 8.04485 13.0662 7.34647 12.5 6.7365L12.5088 6.72766Z'
					fill='#FC85C6'
				/>
				<path
					d='M12.5068 6.72695C12.6749 6.68275 12.7456 6.80651 12.8252 6.92143C13.4003 7.70822 13.9841 8.495 14.5592 9.28178C13.0287 10.4752 11.7548 11.8897 10.8613 13.6223C9.23357 16.7518 8.93278 20.0227 9.89705 23.4173C9.94128 23.5588 9.96782 23.7091 10.0032 23.8505C9.81743 24.0273 9.56089 24.045 9.33088 24.1246C8.54354 24.4074 7.73851 24.6285 6.96886 24.9379C6.22576 22.8869 5.96036 20.7653 6.11075 18.5906C6.3673 14.8511 7.77389 11.5891 10.2598 8.78673C10.9321 8.02647 11.6929 7.35461 12.4979 6.73579L12.5068 6.72695Z'
					fill='#E2007A'
				/>
				<path
					d='M6.96917 24.9291C6.98686 24.8231 7.03994 24.77 7.1461 24.7347C8.03075 24.4429 8.9154 24.1424 9.8089 23.8506C9.87082 23.833 9.94159 23.8506 10.0124 23.8418C10.4812 25.0352 11.012 26.1845 11.7817 27.2188C14.3118 30.6223 17.7 32.4345 21.9374 32.6378C22.2294 32.6555 22.3444 32.7086 22.3355 33.0268C22.3178 33.8755 22.3267 34.7241 22.3444 35.5816C22.3444 35.8645 22.2559 35.9264 21.9905 35.9264C15.3822 35.7761 9.55235 31.6831 7.16379 25.5214C7.09302 25.3358 6.96032 25.159 6.96917 24.9468V24.9291Z'
					fill='#C10061'
				/>
				<path
					d='M3.95416 11.006C4.69727 9.32639 5.71461 7.8147 6.90889 6.43563C9.64246 3.27966 13.0218 1.14916 17.047 0.0352855C17.3743 -0.053117 17.4716 0.0176049 17.5424 0.327014C17.7105 1.10496 17.8962 1.87406 18.1174 2.63432C18.2147 2.98793 18.1705 3.13821 17.7901 3.23546C15.4458 3.85427 13.3491 4.9593 11.4825 6.49751C9.51861 8.12411 7.97932 10.0778 6.90004 12.3851C6.88235 12.4205 6.85581 12.4558 6.82927 12.4824C6.21886 12.0403 5.49345 11.8105 4.82112 11.4834C4.52034 11.3331 4.17532 11.2536 3.94531 10.9884L3.95416 11.006Z'
					fill='#FC4D9D'
				/>
				<path
					d='M3.95252 11.0059C4.84601 11.4125 5.73066 11.8192 6.62416 12.217C6.74801 12.27 6.81878 12.3673 6.83647 12.491C5.79259 14.8248 5.23526 17.2559 5.2618 19.8107C5.27949 21.5434 5.56258 23.2408 6.09337 24.8939C6.09337 25.0088 6.04029 25.1061 5.91644 25.1414C4.95217 25.4243 4.01444 25.8133 3.04133 26.052C1.41357 20.9777 1.69666 16.0094 3.8729 11.1473C3.89944 11.0943 3.92598 11.0501 3.95252 11.0059Z'
					fill='#E2007A'
				/>
				<path
					d='M16.4698 30.3218C16.4521 30.0389 16.6556 29.8444 16.7794 29.6234C17.1864 28.8985 17.5402 28.1382 18.0179 27.4575C20.6807 28.8366 23.3877 28.9427 26.1302 27.7051C26.6698 27.4575 27.174 27.157 27.6341 26.7857C27.8198 26.6354 27.9172 26.6619 28.0587 26.8476C28.5895 27.5283 29.1291 28.209 29.6776 28.8631C29.8722 29.1018 29.8634 29.2168 29.6157 29.4024C26.4929 31.6567 23.0604 32.3374 19.3184 31.4533C18.3099 31.2146 17.3633 30.8257 16.4609 30.3218H16.4698Z'
					fill='#E2007A'
				/>
				<path
					d='M20.4067 11.0061C20.1944 11.015 20.1413 10.8647 20.1059 10.6967C19.8848 9.75967 19.6548 8.8226 19.4336 7.88554C21.6187 7.31092 23.7861 7.417 25.9446 8.04466C26.3073 8.15075 26.3516 8.28335 26.2189 8.61044C25.9181 9.3707 25.6527 10.1486 25.3961 10.9266C25.3077 11.1918 25.2104 11.2537 24.9361 11.1653C23.6622 10.7675 22.3618 10.6791 21.0437 10.8559C20.8313 10.8824 20.6367 11.0238 20.4156 10.9885L20.4067 11.0061Z'
					fill='#E2007A'
				/>
			</g>
			<defs>
				<clipPath id='clip0_8997_79043'>
					<rect
						width='39'
						height='40'
						fill='white'
					/>
				</clipPath>
			</defs>
		</svg>
	);
};

export default PaLogo;

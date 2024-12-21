import { useAppDispatch } from '@/hooks/redux-hooks';
import { useGetSearchResultsQuery } from '@/store/services/apiSlice';
import { setDebouncedKeywords, setKeywords } from '@/store/slices/searchSlice';
import { RootState } from '@/store/store';
import debounce from 'lodash.debounce';
import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router';
import st from './search.module.scss';

export const Search = () => {
	const dispatch = useAppDispatch();
	const keywords = useSelector((state: RootState) => state.search.keywords);
	const debouncedKeywords = useSelector(
		(state: RootState) => state.search.debouncedKeywords
	);

	const navigate = useNavigate();
	const location = useLocation();

	useGetSearchResultsQuery(
		{ keywords: debouncedKeywords },
		{ skip: !debouncedKeywords }
	);

	const debouncedUpdate = useCallback(
		debounce((value: string) => {
			dispatch(setDebouncedKeywords(value));
			const currentQuery = new URLSearchParams(location.search).get('query');
			if (value && value !== currentQuery) {
				navigate(`/search?query=${encodeURIComponent(value)}`);
			}
		}, 1000),
		[location.search, navigate]
	);

	useEffect(() => {
		dispatch(setKeywords(''));
		dispatch(setDebouncedKeywords(''));
	}, [location.pathname, dispatch]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		dispatch(setKeywords(value));
		debouncedUpdate(value);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(setKeywords(''));
		dispatch(setDebouncedKeywords(''));
	};

	const handleReset = () => {
		dispatch(setKeywords(''));
		dispatch(setDebouncedKeywords(''));
	};

	return (
		<form className={st.form} onSubmit={handleSubmit}>
			<button>
				<svg
					width='17'
					height='16'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					role='img'
					aria-labelledby='search'
				>
					<path
						d='M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9'
						stroke='currentColor'
						strokeWidth='1.333'
						strokeLinecap='round'
						strokeLinejoin='round'
					></path>
				</svg>
			</button>
			<input
				className={st.input}
				placeholder='Search...'
				value={keywords}
				onChange={handleInputChange}
				required
				type='text'
			/>
			<button className={st.reset} onClick={handleReset} type='reset'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					className='h-6 w-6'
					fill='none'
					viewBox='0 0 24 24'
					stroke='currentColor'
					strokeWidth='2'
				>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						d='M6 18L18 6M6 6l12 12'
					></path>
				</svg>
			</button>
		</form>
	);
};

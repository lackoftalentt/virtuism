import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SortState {
	movies: { name: string | null; sort: string | null };
	tv: { name: string | null; sort: string | null };
}

const initialState: SortState = {
	movies: { name: 'popularity (DESC)', sort: 'popularity.desc' },
	tv: { name: 'popularity (DESC)', sort: 'popularity.desc' },
};

const sortSlice = createSlice({
	name: 'sort',
	initialState,
	reducers: {
		setSortParams: (
			state,
			action: PayloadAction<{
				category: keyof SortState;
				name: string;
				sort: string;
			}>
		) => {
			const { category, name, sort } = action.payload;
			state[category].name = name;
			state[category].sort = sort;
		},
	},
});

export default sortSlice.reducer;
export const { setSortParams } = sortSlice.actions;

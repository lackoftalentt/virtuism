import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
	keywords: string;
	debouncedKeywords: string;
}

const initialState: SearchState = {
	keywords: '',
	debouncedKeywords: '',
};

const searchSlice = createSlice({
	name: 'search',
	initialState,
	reducers: {
		setKeywords(state, action: PayloadAction<string>) {
			state.keywords = action.payload;
		},
		setDebouncedKeywords(state, action: PayloadAction<string>) {
			state.debouncedKeywords = action.payload;
		},
	},
});

export default searchSlice.reducer;
export const { setKeywords, setDebouncedKeywords } = searchSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
	activePage: number;
}

interface PaginationCategory {
	movies: PaginationState;
	tv: PaginationState;
	actors: PaginationState;
	searchResults: PaginationState;
	recommendations: PaginationState;
}

export type SetActivePagePayload = {
	category: keyof PaginationCategory;
	activePage: number;
};

const initialState: PaginationCategory = {
	movies: {
		activePage: 1,
	},
	tv: {
		activePage: 1,
	},
	actors: {
		activePage: 1
	},
	searchResults: {
		activePage: 1
	},
	recommendations: {
		activePage: 1
	}
};

const paginationSlice = createSlice({
	name: 'pagination',
	initialState,
	reducers: {
		setActivePage(state, action: PayloadAction<SetActivePagePayload>) {
			const { category, activePage } = action.payload;
			state[category].activePage = activePage;
		},
	},
});

export default paginationSlice.reducer;
export const { setActivePage } = paginationSlice.actions;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from '../types/types';

interface FavoriteState {
	movies: Content[];
}

const initialState: FavoriteState = {
	movies: [],
};

const favoriteSlice = createSlice({
	name: 'favorites',
	initialState,
	reducers: {
		addToFavorites(state, action: PayloadAction<Content>) {
			if (!state.movies.find(movie => movie.id === action.payload.id)) {
				state.movies.push(action.payload);
			}
		},
		removeFromFavorites(state, action: PayloadAction<number>) {
			state.movies = state.movies.filter(movie => movie.id !== action.payload);
		},
		resetFavorites(state) {
			state.movies = [];
		},
	},
});

export const { addToFavorites, removeFromFavorites, resetFavorites } =
	favoriteSlice.actions;

export default favoriteSlice.reducer;

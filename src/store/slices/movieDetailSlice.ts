import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface MovieDetailState {
	id: number;
	title: string;
	overview: string;
	poster_path: string;
	backdrop_path: string;
	release_date: string;
	vote_average: number;
	vote_count: number;
}

const initialState: MovieDetailState = {
	id: 0,
	title: 'Untitled',
	overview: 'Overview not defined',
	poster_path: 'path',
	backdrop_path: '',
	release_date: '',
	vote_average: 0,
	vote_count: 0,
};

const movieDetailSlice = createSlice({
	name: 'movieDetail',
	initialState,
	reducers: {
		setMovieDetail(_, action: PayloadAction<MovieDetailState>) {
			return action.payload;
		},
	},
});

export const { setMovieDetail } = movieDetailSlice.actions;
export default movieDetailSlice.reducer;

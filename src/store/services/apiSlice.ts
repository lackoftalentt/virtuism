import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
	ActorResponse,
	ContentResponse,
	GenresResponse,
	Movie,
	MoviesResponse,
	MovieVideoResponse,
	Serial,
	SerialResponse,
} from '../types/types';

const BASE_URL = 'https://api.themoviedb.org/3';

export const tmdbApiSlice = createApi({
	reducerPath: 'tmdbApi',
	baseQuery: fetchBaseQuery({
		baseUrl: BASE_URL,
		prepareHeaders: headers => {
			headers.set('accept', 'application/json');
			headers.set(
				'Authorization',
				'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZTJjZDJmZmE0MzgyZTk0NTNiOThjNzVjOGVlMDUwZiIsIm5iZiI6MTczMjQ1MjM2MC40MDI1MDI4LCJzdWIiOiI2NzFhNjJkM2ZlZmQxZTA1MTBmZmYwNmUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.QYazsaz0SzksFOeEq08aI1R9jfoq0DQJEAqLBMXCnbk'
			);
			return headers;
		},
	}),
	endpoints: builder => ({
		getMovies: builder.query<
			MoviesResponse,
			{ page?: number; genreId?: number; sort?: string } | void
		>({
			query: ({ page = 1, genreId, sort } = {}) =>
				`discover/movie?include_adult=false&include_video=false&language=en-EN&page=${page}&sort_by=${
					sort || 'popularity.desc'
				}${genreId ? `&with_genres=${genreId}` : ''}`,
			keepUnusedDataFor: 120,
		}),

		getSerials: builder.query<
			SerialResponse,
			{ page?: number; genreId?: number; sort?: string }
		>({
			query: ({ page = 1, genreId, sort }) =>
				`/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=${sort}${
					genreId ? `&with_genres=${genreId}` : ''
				}`,
			keepUnusedDataFor: 120,
		}),
		getActors: builder.query<ActorResponse, number | void>({
			query: (page: number) => `/person/popular?language=en-US&page=${page}`,
			keepUnusedDataFor: 120,
		}),
		getNowPlayingMovies: builder.query<MoviesResponse, void>({
			query: () => `/movie/now_playing?language=en-US&page=1`,
			keepUnusedDataFor: 120,
		}),
		getTrendingMovies: builder.query<MoviesResponse, void>({
			query: () => `/trending/movie/day?language=en-US`,
			keepUnusedDataFor: 120,
		}),
		getMoviesGenres: builder.query<GenresResponse, void>({
			query: () => `/genre/movie/list?language=en`,
		}),
		getSerialGenres: builder.query<GenresResponse, void>({
			query: () => `/genre/tv/list?language=en`,
		}),
		getMovieDetails: builder.query<Movie, number>({
			query: id => `/movie/${id}?language=en-US`,
		}),
		getSerialDetails: builder.query<Serial, number>({
			query: id => `/tv/${id}language=en-US`,
		}),
		getSearchResults: builder.query<
			ContentResponse,
			{ keywords: string; page?: number }
		>({
			query: ({ keywords, page = 1 }) => ({
				url: `/search/multi?${
					keywords ? `query=${keywords}&` : ''
				}include_adult=false&language=en-US&page=${page}`,
			}),
		}),
		getMovieVideos: builder.query<MovieVideoResponse, number>({
			query: id => `/movie/${id}/videos?language=en-US`,
		}),
		getSerialVideos: builder.query<MovieVideoResponse, number>({
			query: id => `/tv/${id}/videos?language=en-US`,
		}),
		getMovieRecomendations: builder.query<
			MoviesResponse,
			{ id: number; page: number }
		>({
			query: ({id, page = 1}) =>
				`/movie/${id}/recommendations?language=en-US&page=${page}`,
		}),
		getSerialRecomendations: builder.query<
			SerialResponse,
			{ id: number; page: number }
		>({
			query: ({id, page = 1}) =>
				`/tv/${id}/recommendations?language=en-US&page=${page}`,
		}),
	}),
});

export const {
	useGetMoviesQuery,
	useGetSerialsQuery,
	useGetActorsQuery,
	useGetNowPlayingMoviesQuery,
	useGetTrendingMoviesQuery,
	useGetMoviesGenresQuery,
	useGetSerialGenresQuery,
	useGetMovieDetailsQuery,
	useGetSerialDetailsQuery,
	useGetSearchResultsQuery,
	useGetMovieVideosQuery,
	useGetSerialVideosQuery,
	useGetMovieRecomendationsQuery,
	useGetSerialRecomendationsQuery
} = tmdbApiSlice;

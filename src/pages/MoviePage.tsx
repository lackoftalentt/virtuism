import { Genres } from '@/components/genres/genres';
import { MovieCard } from '@/components/movie-item';

import { SkeletonMovieItem } from '@/components/movie-item/skeleton-movie-item';
import { Sort } from '@/components/sort';
import { PaginationDemo } from '@/components/ui/pagination-demo';

import {
	useGetMoviesGenresQuery,
	useGetMoviesQuery,
} from '@/store/services/apiSlice';
import { RootState } from '@/store/store';
import { Movie } from '@/store/types/types';
import { useSelector } from 'react-redux';

export const MoviePage = () => {
	const activePage = useSelector(
		(state: RootState) => state.pagination.movies.activePage
	);
	const genreId = useSelector(
		(state: RootState) => state.genres.movies.activeGenre || 0
	);

	const sortName =
		useSelector((state: RootState) => state.sort.movies.sort) ||
		'popularity.desc';

	const { data: MovieGenres } = useGetMoviesGenresQuery();

	const { data, isLoading } = useGetMoviesQuery({
		page: activePage,
		genreId: genreId,
		sort: sortName,
	});

	const totalPage = data?.total_pages || 199;

	return (
		<main>
			<h1 className='text-5xl font-bold mb-5 text-blue-900'>Films</h1>
			<div className='flex items-center justify-between'>
				{MovieGenres ? (
					<Genres category='movies' genres={MovieGenres.genres} />
				) : (
					<p className='text-lg'>Loading genress...</p>
				)}
				<Sort category='movies' />
			</div>

			<div className='grid grid-cols-7 gap-4'>
				{isLoading &&
					Array.from({ length: 21 }).map((_, index) => (
						<SkeletonMovieItem key={index} />
					))}

				{data?.results.map((movie: Movie) => (
					<MovieCard key={movie.id} movie={movie} />
				))}
			</div>
			<PaginationDemo category='movies' total_page={totalPage} />
		</main>
	);
};

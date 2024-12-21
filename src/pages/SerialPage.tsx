import { Genres } from '@/components/genres/genres';
import { MovieCard } from '@/components/movie-item';
import { SkeletonMovieItem } from '@/components/movie-item/skeleton-movie-item';
import { Sort } from '@/components/sort';
import { PaginationDemo } from '@/components/ui/pagination-demo';
import {
	useGetSerialGenresQuery,
	useGetSerialsQuery,
} from '@/store/services/apiSlice';
import { RootState } from '@/store/store';
import { Serial } from '@/store/types/types';
import { useSelector } from 'react-redux';

export const SerialPage = () => {
	const activePage =
		useSelector((state: RootState) => state.pagination.tv.activePage) || 1;

	const genreId =
		useSelector((state: RootState) => state.genres.tv.activeGenre) || 0;

	const sortName =
		useSelector((state: RootState) => state.sort.tv.sort) || 'popularity.desc';

	const { data, isLoading } = useGetSerialsQuery({
		page: activePage,
		genreId: genreId,
		sort: sortName,
	});

	const totalPage = data?.total_pages || 199;

	const { data: SerialGenres } = useGetSerialGenresQuery();

	return (
		<main>
			<h1 className='text-5xl font-bold mb-5 text-blue-900'>Serials</h1>
			<div className='flex items-center justify-between'>
				{SerialGenres ? (
					<Genres category='tv' genres={SerialGenres.genres} />
				) : (
					<p className='text-lg'>Loading genress...</p>
				)}
				<Sort category='tv' />
			</div>

			<div className='grid grid-cols-6 gap-8'>
				{isLoading &&
					Array.from({ length: 21 }).map((_, index) => (
						<SkeletonMovieItem key={index} />
					))}

				{data?.results.map((serial: Serial) => (
					<MovieCard key={serial.id} serial={serial} />
				))}
			</div>
			<PaginationDemo category='tv' total_page={totalPage} />
		</main>
	);
};

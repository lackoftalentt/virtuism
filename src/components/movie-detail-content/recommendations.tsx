import {
	useGetMovieRecomendationsQuery,
	useGetSerialRecomendationsQuery,
} from '@/store/services/apiSlice';
import { RootState } from '@/store/store';
import { Movie, Serial } from '@/store/types/types'; // Импорт типов
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { MovieCard } from '../movie-item';
import { SkeletonMovieItem } from '../movie-item/skeleton-movie-item';
import { PaginationDemo } from '../ui/pagination-demo';

export const Recommendations = () => {
	const { type, id } = useParams();
	const itemId = Number(id);
	const activePage = useSelector(
		(state: RootState) => state.pagination.recommendations.activePage
	);

	const { data: recommendations, isLoading } =
		type === 'movie'
			? useGetMovieRecomendationsQuery({
					id: itemId,
					page: activePage,
			  })
			: useGetSerialRecomendationsQuery({
					id: itemId,
					page: activePage,
			  });

	const total_pages = recommendations?.total_pages
		? recommendations?.total_pages
		: 0;

	return (
		<section className='max-w-[1350px] grid justify-center'>
			{recommendations?.results.length === 0 ? (
				<h1 className='text-5xl font-bold mb-5 text-blue-900 block  '>
					We couldn't find recommended content &#129301;
				</h1>
			) : (
				<h1 className='text-5xl font-bold mb-5 text-blue-900 block'>
					Recommendations:
				</h1>
			)}
			<main className='grid grid-cols-6 gap-8'>
				{isLoading &&
					Array.from({ length: 21 }).map((_, index) => (
						<SkeletonMovieItem key={index} />
					))}

				{recommendations?.results.map(item => {
					if ((item as Movie).title) {
						return <MovieCard key={item.id} movie={item as Movie} />;
					} else {
						return <MovieCard key={item.id} serial={item as Serial} />;
					}
				})}
			</main>
			<PaginationDemo total_page={total_pages} category='recommendations' />
		</section>
	);
};

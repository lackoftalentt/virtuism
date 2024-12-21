import { MovieCard } from '@/components/movie-item';
import { SkeletonMovieItem } from '@/components/movie-item/skeleton-movie-item';
import { NotFound } from '@/components/not-found';
import { PaginationDemo } from '@/components/ui/pagination-demo';
import { useGetSearchResultsQuery } from '@/store/services/apiSlice';
import { RootState } from '@/store/store';
import { Content, Movie, Serial } from '@/store/types/types';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

export const SearchResultsPage = () => {
	const [searchParams] = useSearchParams();
	const page = useSelector(
		(state: RootState) => state.pagination.searchResults.activePage
	);

	const keywords = searchParams.get('query') || '';

	const { data, isLoading } = useGetSearchResultsQuery(
		{ keywords, page },
		{
			skip: !keywords,
		}
	);

	let total_page = data?.total_pages;

	if (!total_page) {
		return (total_page = data?.total_pages);
	}

	return (
		<div className='w-[1350px]'>
			<h1 className='text-5xl font-bold mb-5 text-blue-900'>
				Search results found: {keywords}
			</h1>
			<div className='grid grid-cols-6 gap-8'>
				{isLoading &&
					Array.from({ length: 21 }).map((_, index) => (
						<SkeletonMovieItem key={index} />
					))}
				{data?.results.length === 0 ? (
					<NotFound />
				) : (
					data?.results.map((content: Content) => (
						<MovieCard
							key={content.id}
							movie={
								content.media_type === 'movie' ? (content as Movie) : undefined
							}
							serial={
								content.media_type === 'tv' ? (content as Serial) : undefined
							}
						/>
					))
				)}
			</div>
			{data?.results.length === 0 || 1 ? null : (
				<PaginationDemo total_page={total_page} category='searchResults' />
			)}
		</div>
	);
};

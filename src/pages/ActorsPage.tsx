import { ActorCard } from '@/components/actors-item';
import { ActorsSkeleton } from '@/components/actors-item/skeleton-actors';
import { PaginationDemo } from '@/components/ui/pagination-demo';
import { useGetActorsQuery } from '@/store/services/apiSlice';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export const ActorsPage = () => {
	const activePage = useSelector(
		(state: RootState) => state.pagination.actors.activePage
	);

	const { data, isLoading } = useGetActorsQuery(activePage);

	const totalPages = data?.total_pages || 199;

	return (
		<>
			<div>
				<h1 className='text-5xl font-bold mb-5 block text-blue-900'>Actors</h1>
				<div className='grid grid-cols-4 gap-10'>
					{isLoading &&
						Array.from({ length: 20 }).map((_, index) => (
							<ActorsSkeleton key={index} />
						))}

					{!isLoading &&
						data?.results.map(actor => <ActorCard key={actor.id} {...actor} />)}
				</div>
				<PaginationDemo category='actors' total_page={totalPages} />
			</div>
		</>
	);
};

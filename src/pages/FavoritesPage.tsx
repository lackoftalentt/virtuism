import { MovieCard } from '@/components/movie-item';
import { RootState } from '@/store/store';
import { Movie, Serial } from '@/store/types/types';
import { useSelector } from 'react-redux';

export const FavoritesPage = () => {
	const favorites = useSelector((state: RootState) => state.favorites.movies);

	return (
		<main>
			{
				<h1 className='text-5xl font-bold mb-5 text-blue-900'>
					{favorites.length === 0 ? 'You have no saved movies😕' : 'Favorite'}
				</h1>
			}
			<div className='grid grid-cols-6 gap-8'>
				{favorites.map(favorite => {
					if ((favorite as Movie).title) {
						return <MovieCard key={favorite.id} movie={favorite as Movie} />;
					} else {
						return <MovieCard key={favorite.id} serial={favorite as Serial} />;
					}
				})}
			</div>
		</main>
	);
};

import { Movie, Serial } from '@/store/types/types';
import { FavoriteButton } from './favorite-button';
import { WatchButton } from './watch-button';

interface MovieButtonsProps {
	movie?: Movie;
	serial?: Serial;
}

export const MovieButtons = ({ movie, serial }: MovieButtonsProps) => {
	return (
	
			<div className='grid gap-1'>
				<WatchButton movie={movie} serial={serial} />
				<FavoriteButton movie={movie} serial={serial} />
			</div>
		
	);
};

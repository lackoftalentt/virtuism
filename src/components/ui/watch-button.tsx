import { useAppDispatch } from '@/hooks/redux-hooks';
import { setActiveUrl } from '@/store/slices/navigateSlice';
import { Movie, Serial } from '@/store/types/types';
import { Play } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Button } from './button';

interface WatchButtonProps {
	movie?: Movie;
	serial?: Serial;
}

export const WatchButton = ({ movie, serial }: WatchButtonProps) => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const onDetailHandler = () => {
		const id = movie?.id || serial?.id;
		const type = movie ? 'movie' : 'serial';

		navigate(`/${type}/${id}`);
		dispatch(setActiveUrl(`${type}`));
		window.scrollTo(0, 0);
	};

	return (
		<div className='grid gap-1'>
			<Button
				onClick={() => onDetailHandler()}
				variant='secondary'
				className='w-[150px] rounded-full font-bold items-center'
			>
				<Play /> Watch
			</Button>
		</div>
	);
};

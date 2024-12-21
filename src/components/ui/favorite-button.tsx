import { useAppDispatch } from '@/hooks/redux-hooks';
import { useAuth } from '@/hooks/use-auth';
import {
	addToFavorites,
	removeFromFavorites,
} from '@/store/slices/favoriteSlice';
import { RootState } from '@/store/store';
import { Content, Movie, Serial } from '@/store/types/types';
import { Bookmark, BookmarkXIcon } from 'lucide-react';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { Bounce, toast } from 'react-toastify';
import { Button } from './button';
import { Modal } from './modal';

interface FavoriteButtonProps {
	movie?: Movie;
	serial?: Serial;
}

export const FavoriteButton = ({ movie, serial }: FavoriteButtonProps) => {
	const [isModalOpen, setModalOpen] = useState<boolean>(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { isAuth } = useAuth();
	const favorites = useSelector((state: RootState) => state.favorites.movies);
	const notify = (message: string) =>
		toast.info(message, {
			position: 'top-right',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: 'dark',
			transition: Bounce,
		});

	const confirmDelete = () => {
		dispatch(removeFromFavorites(itemToAddToFavorites?.id as number));
		setModalOpen(false);
		notify('Removed from favorite');
	};
	const handleLoginRedirect = () => {
		navigate('/register');
		setModalOpen(false);
	};

	const handleFavorites = () => {
		if (isAuth) {
			if (isAdded) {
				setModalOpen(true);
			} else {
				dispatch(addToFavorites(itemToAddToFavorites as Content));
				notify('Added to favorites');
			}
		} else {
			setModalOpen(true);
		}
	};

	const itemToAddToFavorites = movie || serial;

	const isAdded = favorites.some(
		favorite => favorite.id === itemToAddToFavorites?.id
	);

	return (
		<>
			<Button
				onClick={handleFavorites}
				variant={isAdded ? 'default' : 'secondary'}
				className='rounded-full font-bold items-center'
			>
				{isAdded ? (
					<>
						<BookmarkXIcon /> Remove fuv
					</>
				) : (
					<>
						<Bookmark /> Add to fuv
					</>
				)}
			</Button>

			<Modal
				isOpen={isModalOpen}
				onClose={() => setModalOpen(false)}
				onConfirm={() => setModalOpen(false)}
				onCancel={isAuth ? confirmDelete : handleLoginRedirect}
				title={isAuth ? 'Confirm Deletion' : 'Need to login😘'}
				message={
					isAuth
						? 'Are you sure you want to delete this movie from your favorites?'
						: 'Please log in'
				}
				cancelMessage={isAuth ? 'Delete' : 'Sign up'}
				agreeMessage={isAuth ? 'Cancel' : 'A little later'}
			/>
		</>
	);
};

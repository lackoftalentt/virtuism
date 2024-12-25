import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { addReview } from '@/store/services/reviewsService';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';
import { ReviewFormBlur } from './review-form-blur';
import profileImage from '/src/assets/images/isagi.jpg';

interface ReviewsFormProps {
	movieId: string;
}

export const ReviewsForm = ({ movieId }: ReviewsFormProps) => {
	const { userName = 'Guest', userId, isAuth } = useAuth();
	const [text, setText] = useState<string>('');
	const notify = (message: string) =>
		toast.info(message, {
			position: 'top-right',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: false,
			pauseOnHover: true,
			draggable: true,
			theme: 'dark',
			transition: Bounce,
		});

	const handleAddReview = async () => {
		try {
			if (text.trim()) {
				addReview(movieId, userId, userName, text);
				setText('');
				notify('Message sended!')
			}
		} catch (error) {}
	};

	return (
		<div className='relative w-full'>
			{!isAuth && <ReviewFormBlur />}

			<div
				className={`grid w-full gap-2 ${!isAuth ? 'pointer-events-none' : ''}`}
			>
				<div className='flex gap-4'>
					<div className='flex flex-col items-center justify-center'>
						<img
							className='w-[50px] rounded-full'
							src={profileImage}
							alt='User profile'
						/>
						<p className='truncate font-semibold text-sm leading-tight opacity-80'>
							{userName}
						</p>
					</div>
					<textarea
						value={text}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
							setText(e.target.value)
						}
						id='message'
						className='block min-h-[80px] max-h-[250px] p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border focus:!border-blue-600'
						placeholder='Write your thoughts here...'
					></textarea>
				</div>
				<Button onClick={handleAddReview} variant={'outline'}>
					Send message
				</Button>
			</div>
		</div>
	);
};

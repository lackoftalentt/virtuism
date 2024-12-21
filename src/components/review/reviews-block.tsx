import { useParams } from 'react-router';
import { Separator } from '../ui/separator';

import { ReviewsForm } from './review-form';
import { ReviewsItemsContainer } from './reviews-container-items';

export const ReviewsBlock = () => {
	const { id } = useParams<string>();

	const movieId = id;

	return (
		<div className='my-[50px]'>
			<h1 className='text-5xl font-bold mb-5 text-blue-900 block '>Reviews</h1>
			<div className='relative'>
				<ReviewsForm movieId={movieId as string} />
				<Separator className='my-[20px]' />
				<ReviewsItemsContainer />
			</div>
		</div>
	);
};

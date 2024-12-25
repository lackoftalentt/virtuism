import { subscribeToReviews } from '@/store/services/reviewsService';
import { Review } from '@/store/types/types';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ReviewsItem } from './reviews-item';
import { SkeletonReview } from './skeleton-review';

export const ReviewsItemsContainer = () => {
	const { id } = useParams<string>();
	const [reviews, setReviews] = useState<Review[]>([]);
	const [isLoading, setIsloading] = useState<Boolean>(true);

	useEffect(() => {
		const unsubscribe = subscribeToReviews(id as string, newReviews => {
			setReviews(newReviews);
			setIsloading(false);
		});
		return () => unsubscribe();
	}, [reviews]);

	return (
		<>
			{isLoading &&
				Array.from({ length: 3 }).map((_, index) => (
					<SkeletonReview key={index} />
				))}
			{reviews.map(review => (
				<ReviewsItem
					key={review.id}
					userName={review.userName}
					text={review.text}
					email={review.email}
				/>
			))}
		</>
	);
};

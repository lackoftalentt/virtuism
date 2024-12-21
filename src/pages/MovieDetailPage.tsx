import { MovieDetailContent } from '@/components/movie-detail-content';
import { Recommendations } from '@/components/movie-detail-content/recommendations';
import { ReviewsBlock } from '@/components/review/reviews-block';

export const MovieDetailPage = () => {
	return (
		<div>
			<MovieDetailContent />
			<ReviewsBlock />
			<Recommendations />
		</div>
	);
};

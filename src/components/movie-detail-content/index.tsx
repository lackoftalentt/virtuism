import {
	useGetMovieDetailsQuery,
	useGetSerialDetailsQuery,
} from '@/store/services/apiSlice';
import { Content, Movie, Serial } from '@/store/types/types';
import { Play } from 'lucide-react';
import { useParams } from 'react-router';
import { Button } from '../ui/button';
import { PosterSkeleton } from './poster-skeleton';
import { ContentDetailSkeleton } from './skeleton-content-detail';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import { ContentTrailer } from '../content-trailer';
import { FavoriteButton } from '../ui/favorite-button';

import logo from '/src/assets/images/logo.png';

function isMovie(content: Content): content is Movie {
	return (content as Movie).title !== undefined;
}

export const MovieDetailContent = () => {
	const { id, type } = useParams<{ type: string; id: string }>();

	const { data: content, isLoading } =
		type === 'movie'
			? useGetMovieDetailsQuery(Number(id))
			: useGetSerialDetailsQuery(Number(id));

	if (!content) {
		return <ContentDetailSkeleton />;
	}

	if (isLoading) {
		return <ContentDetailSkeleton />;
	}

	const title = isMovie(content) ? content?.title : content?.name;
	const releaseDate = isMovie(content)
		? content?.release_date
		: content?.first_air_date;

	return (
		<div className='relative mb-[30px]'>
			<img
				src={
					content.backdrop_path
						? `https://media.themoviedb.org/t/p/w1920_and_h800_multi_faces/${content?.backdrop_path}`
						: `${logo}`
				}
				alt={title || 'Backdrop'}
				className='w-[1920px] h-[600px] object-cover rounded-2xl'
			/>
			<div className='absolute inset-0 bg-black bg-opacity-50 rounded-xl'></div>
			<div className='absolute inset-0 flex items-center justify-center px-10'>
				<div className='flex gap-10 items-start'>
					<div>
						{isLoading ? (
							<PosterSkeleton />
						) : (
							<img
								className='rounded-xl shadow-lg max-w-[300px]'
								src={
									content?.poster_path
										? `https://media.themoviedb.org/t/p/w300_and_h450_bestv2/${content?.poster_path}`
										: `${logo}`
								}
								alt='Poster'
							/>
						)}
					</div>
					<div className='text-white max-w-[800px]'>
						<div>
							<h2 className='text-4xl font-bold mb-3'>{title}</h2>
						</div>
						<div className='mb-5'>
							<p className='font-semibold'>
								{content.genres.map(genre => genre.name).join(' , ')}
							</p>
							<p className='font-semibold'>{releaseDate}</p>
						</div>
						<div className='mb-5'>
							<p className='font-semibold'>
								<span className='text-2xl text-red-700'>
									{content?.vote_average.toFixed(1)}
								</span>{' '}
								Rating
							</p>
						</div>
						<div className='flex gap-3 mb-5'>
							<FavoriteButton
								movie={content as Movie}
								serial={content as Serial}
							/>
							<Dialog>
								<DialogTrigger asChild>
									<Button
										variant='outline'
										className='text-white bg-transparent rounded-full'
									>
										<Play /> Watch trailer
									</Button>
								</DialogTrigger>
								<ContentTrailer />
							</Dialog>
						</div>
						{content?.tagline ? (
							<div className='mb-5'>
								<p className='font-medium text-xl opacity-80'>
									«{content?.tagline}»
								</p>
							</div>
						) : null}
						{content?.overview ? (
							<div className='mb-5'>
								<h2 className='text-xl font-bold mb-2'>Review</h2>
								<p className='font-medium'>{content?.overview}</p>
							</div>
						) : null}
						<div>
							<h2 className='text-xl font-bold mb-2'>Director</h2>
							<p className='text-lg font-bold'>
								{content?.created_by
									? content?.created_by
											.map(director => director.name)
											.join(', ')
									: null}
								{content.created_by && content?.created_by?.length > 0
									? ', '
									: null}
								Beybarys B
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

import { Movie, Serial } from '@/store/types/types';
import { MovieButtons } from '../ui/movie-buttons';

interface MovieCardProps {
	movie?: Movie;
	serial?: Serial;
}

export const MovieCard = ({ movie, serial }: MovieCardProps) => {
	const poster_path = movie?.poster_path || serial?.poster_path;
	const title = movie?.title || serial?.name || 'No Title Available';
	const vote_average = movie?.vote_average ?? serial?.vote_average ?? 0;

	return (
		<div className='p-0 flex flex-col items-center justify-center rounded-xl group relative cursor-pointer mb-4'>
			<img
				className='w-[200px] h-[278px] rounded-xl object-cover transition-all duration-300 group-hover:blur-sm'
				src={
					poster_path
						? `https://image.tmdb.org/t/p/w500/${poster_path}`
						: '/src/assets/images/logo.png'
				}
				alt={title}
			/>
			<div className='rounded-xl absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
				<h1 className='text-lg text-center font-extrabold text-white tracking-tight lg:text-xl -4'>
					{title}
				</h1>
				<p className='scroll-m-20 text-red-500 font-extrabold tracking-tight lg:text-xl mb-8'>
					{vote_average.toFixed(1)}
				</p>
				<MovieButtons movie={movie} serial={serial} />
			</div>
		</div>
	);
};

import { Movie } from '@/store/types/types';
import { MovieButtons } from '../ui/movie-buttons';

export const Banner = (movie: Movie) => {
	return (
		<>
			<div className='banner rounded-xl relative w-[1350px] h-[400px] overflow-hidden group mb-[35px] cursor-pointer'>
				<img
					className='hover:blur-sm  w-[1350px] h-[400px]  object-cover transition-all duration-300 group-hover:blur-sm'
					src={`https://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
					alt='Banner'
				/>
				<div className='group bg-black bg-opacity-50 inset-0 absolute opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center '>
					<div className='flex items-center col'>
						<div>
							<h1 className=' text-white mb-3 font-bold flex gap-5 text-4xl w-[250px]'>
								{movie.title}
							</h1>
							<p className='text-white text-sm mb-2 mr-5 w-[450px]'>
								{movie.overview}
							</p>
						</div>
						<MovieButtons movie={movie} />
					</div>
				</div>
			</div>
		</>
	);
};

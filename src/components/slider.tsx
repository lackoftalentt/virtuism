import { Movie } from '@/store/types/types';
import { Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { MovieCard } from './movie-item';
import { SkeletonMovieItem } from './movie-item/skeleton-movie-item';

interface MovieSliderProps {
	title: string;
	movies: Movie[];
	slidesPerView?: number;
	isLoading: boolean;
	id: string;
}

export const MovieSlider = ({
	title,
	movies,
	slidesPerView = 7,
	isLoading,
	id,
}: MovieSliderProps) => {
	return (
		<div className='mb-[50px]'>
			<h1 className='text-5xl font-bold mb-5 text-blue-900'>{title}</h1>
			<Swiper
				modules={[Scrollbar]}
				scrollbar={{ draggable: true }}
				spaceBetween={10}
				slidesPerView={slidesPerView}
				key={id}
			>
				{isLoading &&
					Array.from({ length: 7 }).map((_, index) => (
						<SwiperSlide key={`skeleton-${index}`}>
							<SkeletonMovieItem />
						</SwiperSlide>
					))}

				{movies.map((movie: Movie) => (
					<SwiperSlide key={movie.id}>
						<MovieCard movie={movie} />
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

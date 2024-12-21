import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Banner } from '@/components/banner';
import { useGetMoviesQuery } from '@/store/services/apiSlice';
import { Movie } from '@/store/types/types';
import { SkeletonBanner } from './banner/skeleton-banner';

export const BannerContainer = () => {
	const { data, isLoading } = useGetMoviesQuery();
	return (
		<Swiper
			modules={[Pagination]}
			pagination={{ clickable: true }}
			spaceBetween={1}
			slidesPerView={1}
		>
			{isLoading &&
				Array.from({ length: 1 }).map((_, index) => (
					<SkeletonBanner key={index} />
				))}

			{data?.results.map((movie: Movie) => (
				<SwiperSlide key={movie.id}>
					<Banner {...movie} key={movie.id} />
				</SwiperSlide>
			))}
		</Swiper>
	);
};

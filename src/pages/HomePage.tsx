import { BannerContainer } from '@/components/banner-container';
import { MovieSlider } from '@/components/slider';
import {
	useGetNowPlayingMoviesQuery,
	useGetTrendingMoviesQuery,
} from '@/store/services/apiSlice';

export const HomePage = () => {
	const { data: nowPlayingData, isLoading: nowPlayingLoading } =
		useGetNowPlayingMoviesQuery();
	const { data: trendingData, isLoading: trendingLoading } =
		useGetTrendingMoviesQuery();

	return (
		<main className='max-w-[1350px]'>
			<BannerContainer />

			<MovieSlider
				title='Now Playing'
				movies={nowPlayingData?.results || []}
				isLoading={nowPlayingLoading}
				id='nowPlaying'
			/>

			<MovieSlider
				title='Top Rated'
				movies={trendingData?.results || []}
				isLoading={trendingLoading}
				id='Trends'
			/>
		</main>
	);
};

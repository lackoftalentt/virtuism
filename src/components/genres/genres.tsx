import { useAppDispatch } from '@/hooks/redux-hooks';
import { clearActiveGenre, setActiveGenre } from '@/store/slices/genresSlice';
import { setActivePage } from '@/store/slices/paginationSlice';
import { RootState } from '@/store/store';
import { GenresType } from '@/store/types/types';
import { BadgeX } from 'lucide-react';
import { useSelector } from 'react-redux';
import { A11y, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

interface GenresProps {
	genres: GenresType[];
	category: 'movies' | 'tv';
}

export const Genres = ({ genres, category }: GenresProps) => {
	const dispatch = useAppDispatch();

	const activeGenreId = useSelector(
		(state: RootState) => state.genres[category].activeGenre
	);

	const handleGenreClick = (id: number) => {
		dispatch(setActiveGenre({ category, id }));
		dispatch(setActivePage({ category, activePage: 1 }));
	};

	return (
		<ul className='flex gap my-3 max-w-[1050px] justify-around items-center'>
			{activeGenreId === null ? null : (
				<span
					className='mb-[22px] mr-3 cursor-pointer '
					onClick={() => dispatch(clearActiveGenre({ category }))}
				>
					<BadgeX color='blue' />
				</span>
			)}

			<Swiper
				modules={[Scrollbar, A11y]}
				scrollbar={{ draggable: true }}
				spaceBetween={0}
				slidesPerView={6}
			>
				{genres.map(genre => (
					<SwiperSlide className='pb-5' key={genre.id}>
						<li
							onClick={() => handleGenreClick(genre.id)}
							className={`bg-slate-100 rounded-3xl text-blue-900 font-bold py-2 cursor-pointer text-center whitespace-nowrap hover:bg-blue-800 hover:text-white transition-colors w-[165px] ${
								activeGenreId === genre.id ? '!bg-blue-800 !text-white' : ''
							}`}
						>
							{genre.name}
						</li>
					</SwiperSlide>
				))}
			</Swiper>
		</ul>
	);
};

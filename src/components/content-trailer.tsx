import {
	useGetMovieVideosQuery,
	useGetSerialVideosQuery,
} from '@/store/services/apiSlice';

import { DialogContent, DialogTitle } from '@/components/ui/dialog';
import ReactPlayer from 'react-player';
import { useParams } from 'react-router';

export const ContentTrailer = () => {
	const { id, type } = useParams<{ type: string; id: string }>();

	// Получаем данные в зависимости от типа контента
	const { data: videos } =
		type === 'movie'
			? useGetMovieVideosQuery(Number(id))
			: type === 'serial'
			? useGetSerialVideosQuery(Number(id))
			: { data: null };

	const trailer = videos?.results.find(
		video => video.site === 'YouTube' && video.type === 'Trailer'
	);

	return (
		<DialogContent className='max-w-[1350px] h-[800px]'>
			<DialogTitle>{trailer?.name}</DialogTitle>
			<ReactPlayer
				width='1300px'
				height='700px'
				controls
				url={`https://www.youtube.com/watch?v=${trailer?.key}`}
			/>
		</DialogContent>
	);
};

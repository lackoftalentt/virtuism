import ContentLoader from 'react-content-loader';

export const SkeletonMovieItem = () => {
	return (
		<ContentLoader
			speed={2}
			width={200}
			height={300}
			viewBox='0 0 220 300'
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
			className='mb-[-30px]  mt-[-30px]'
		>
			<rect x='107' y='119' rx='0' ry='0' width='0' height='1' />
			<rect className='w-[200px] h-[287px]' x='7' y='15' rx='12' ry='12' width='187' height='298' />
		</ContentLoader>
	);
};

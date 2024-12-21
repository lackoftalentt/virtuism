import ContentLoader from 'react-content-loader';

export const SkeletonReview = () => {
	return (
		<ContentLoader
			speed={2}
			width={1400}
			height={100}
			viewBox='0 0 1350 100'
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
		>
			<rect x='107' y='119' rx='0' ry='0' width='0' height='1' />
			<rect x='8' y='15' rx='12' ry='12' width='1350' height='100' />
		</ContentLoader>
	);
};

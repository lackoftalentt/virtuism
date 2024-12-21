import ContentLoader from 'react-content-loader';

export const ActorsSkeleton = () => {
	return (
		<ContentLoader
			speed={2}
			width={300}
			height={500}
			viewBox='0 0 300 500'
			backgroundColor='#f3f3f3'
			foregroundColor='#ecebeb'
		>
			<rect x='107' y='119' rx='0' ry='0' width='0' height='1' />
			<rect x='8' y='15' rx='50' ry='50' width='300' height='500' />
		</ContentLoader>
	);
};

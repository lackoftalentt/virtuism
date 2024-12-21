import ContentLoader from 'react-content-loader';

export const ContentDetailSkeleton = () => {
	return 	<ContentLoader
	speed={2}
	width={1420}
	height={600}
	viewBox='0 0 1420 600'
	backgroundColor='#f3f3f3'
	foregroundColor='#ecebeb'
>
	<rect x='107' y='119' rx='0' ry='0' width='0' height='1' />
	<rect x='8' y='15' rx='12' ry='12' width='1420' height='600' />
</ContentLoader>;
};

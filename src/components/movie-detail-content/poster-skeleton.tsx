import { Skeleton } from '../ui/skeleton';

export const PosterSkeleton = () => {
	return (
		<div>
			<Skeleton className='flex gap-10 items-start w-[300px] h-[450px]' />
		</div>
	);
};

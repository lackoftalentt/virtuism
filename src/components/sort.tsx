import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setSortParams } from '@/store/slices/sortSlice';
import { RootState } from '@/store/store';
import { SlidersHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';

export const sortingList = [
	{ name: 'popularity (DESC)', sort: 'popularity.desc' },
	{ name: 'popularity (ASC)', sort: 'popularity.asc' },
	{ name: 'title (DESC)', sort: 'original_title.desc' },
	{ name: 'title (ASC)', sort: 'original_title.asc' },
	{ name: 'vote count (DESC)', sort: 'vote_count.desc' },
	{ name: 'vote count (ASC)', sort: 'vote_count.asc' },
	{ name: 'vote average (DESC)', sort: 'vote_average.desc' },
	{ name: 'vote average (ASC)', sort: 'vote_average.asc' },
];

interface SortProps {
	category: 'movies' | 'tv';
}

export const Sort = ({ category }: SortProps) => {
	const selectedSort = useSelector(
		(state: RootState) => state.sort[category].sort
	);
	const dispatch = useAppDispatch();

	const handleSortChange = (name: string, sort: string) => {
		dispatch(setSortParams({ category, name, sort }));
	};

	const sortName = useSelector((state: RootState) => state.sort[category].name);

	return (
		<div className='mr-16 mb-5'>
			<Popover >
				<PopoverTrigger asChild>
					<Button className='text-md text-blue-800' variant='link'>
						<SlidersHorizontal /> Sorting by:{' '}
						<span className='font-bold'>{sortName}</span>
					</Button>
				</PopoverTrigger>
				<PopoverContent className='w-80'>
					<ul className='text-center grid gap-2'>
						{sortingList.map(list => (
							<li
								key={list.sort}
								className={`cursor-pointer rounded-sm py-2 px-4 font-semibold hover:bg-blue-500 hover:text-white transition-colors ${
									selectedSort === list.sort ? '!bg-blue-800 text-white' : ''
								}`}
								onClick={() => handleSortChange(list.name, list.sort)}
							>
								{list.name}
							</li>
						))}
					</ul>
				</PopoverContent>
			</Popover>
		</div>
	);
};

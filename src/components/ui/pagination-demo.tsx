import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from '@/components/ui/pagination';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setActivePage } from '@/store/slices/paginationSlice';

import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

interface PaginationState {
	total_page: number;
	category: 'movies' | 'tv' | 'actors' | 'searchResults' | 'recommendations';
}

export const PaginationDemo = ({ total_page, category }: PaginationState) => {
	const dispatch = useAppDispatch();

	const activePage = useSelector(
		(state: RootState) => state.pagination[category].activePage
	);

	const maxPages = Math.min(total_page, 100);
	const visibleRange: number = 2;

	const handlePageChange = (page: number): void => {
		if (page >= 1 && page <= maxPages) {
			dispatch(setActivePage({ category, activePage: page }));
		}
		window.scrollTo(0, 0);
	};

	const getVisiblePages = (): number[] => {
		const pages: number[] = [];
		for (
			let i = Math.max(1, activePage - visibleRange);
			i <= Math.min(maxPages, activePage + visibleRange);
			i++
		) {
			pages.push(i);
		}
		return pages;
	};

	if (!total_page) {
		return null;
	}

	return (
		<Pagination className='my-[30px]'>
			<PaginationContent>
				{activePage === 1 ? null : (
					<PaginationItem>
						<PaginationPrevious
							className='cursor-pointer'
							onClick={e => {
								e.preventDefault();
								handlePageChange(activePage - 1);
							}}
						/>
					</PaginationItem>
				)}

				{activePage > visibleRange + 1 && (
					<>
						<PaginationItem>
							<PaginationLink
								className='cursor-pointer'
								onClick={e => {
									e.preventDefault();
									handlePageChange(1);
								}}
							>
								1
							</PaginationLink>
						</PaginationItem>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
					</>
				)}

				{getVisiblePages().map(page => (
					<PaginationItem key={page}>
						<PaginationLink
							className='cursor-pointer'
							isActive={page === activePage}
							onClick={e => {
								e.preventDefault();
								handlePageChange(page);
							}}
						>
							{page}
						</PaginationLink>
					</PaginationItem>
				))}

				{activePage < maxPages - visibleRange && (
					<>
						<PaginationItem>
							<PaginationEllipsis />
						</PaginationItem>
						<PaginationItem>
							<PaginationLink
								className='cursor-pointer'
								onClick={e => {
									e.preventDefault();
									handlePageChange(maxPages);
								}}
							>
								{maxPages}
							</PaginationLink>
						</PaginationItem>
					</>
				)}

				{activePage === maxPages ? null : (
					<PaginationItem>
						<PaginationNext
							className='cursor-pointer'
							onClick={e => {
								e.preventDefault();
								handlePageChange(activePage + 1);
							}}
						/>
					</PaginationItem>
				)}
			</PaginationContent>
		</Pagination>
	);
};

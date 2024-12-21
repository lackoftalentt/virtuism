import {
	useGetMovieDetailsQuery,
	useGetSerialDetailsQuery,
} from '@/store/services/apiSlice';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbSeparator,
} from './breadcrumb';

import { useAppDispatch } from '@/hooks/redux-hooks';
import { setActiveUrl } from '@/store/slices/navigateSlice';
import { useParams } from 'react-router';

const capitalize = (text: string) =>
	text.charAt(0).toUpperCase() + text.slice(1);

type RouteParams = {
	id: string;
	type: 'movie' | 'serial';
};

export const Location = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const { id, type } = useParams<RouteParams>();

	const { data: movie } = useGetMovieDetailsQuery(Number(id), {
		skip: type !== 'movie',
	});

	const { data: series } = useGetSerialDetailsQuery(Number(id), {
		skip: type !== 'serial',
	});

	const pathnames =
		location.pathname === '/'
			? []
			: location.pathname.split('/').filter(Boolean);

	return (
		<Breadcrumb aria-label='breadcrumb'>
			<BreadcrumbList>
				<BreadcrumbItem onClick={() => dispatch(setActiveUrl('/'))}>
					<Link to='/'>Home</Link>
				</BreadcrumbItem>
				<BreadcrumbSeparator />
				{pathnames.map((segment, index) => {
					const pathTo = `/${pathnames.slice(0, index + 1).join('/')}`;
					const isLast = index === pathnames.length - 1;

					let title = segment;

					if (segment === id) {
						title =
							type === 'movie'
								? movie?.title || segment
								: series?.name || segment;
					}

					return (
						<BreadcrumbItem key={pathTo}>
							{index > 0 && <BreadcrumbSeparator className='m-[0 5px]' />}

							{isLast ? (
								<span onClick={() => dispatch(setActiveUrl(title))}>
									{capitalize(title)}
								</span>
							) : (
								<Link to={pathTo}>{capitalize(title)}</Link>
							)}
						</BreadcrumbItem>
					);
				})}
			</BreadcrumbList>
		</Breadcrumb>
	);
};

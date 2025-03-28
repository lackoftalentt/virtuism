import {
	Bookmark,
	HomeIcon,
	PersonStandingIcon,
	Tv,
	TvMinimalPlay,
} from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router';
import logo from '../assets/images/logo.png'
import profileImage from '../assets/images/isagi.jpg'

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { setActiveUrl } from '@/store/slices/navigateSlice';
import { UserState } from '@/store/slices/userSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Separator } from './ui/separator';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	const { isAuth } = useAuth();

	const { email, userName } = useSelector<RootState, UserState>(
		state => state.user
	);

	const data = {
		user: {
			name: userName,
			email: email,
			avatar: profileImage,
		},
		navMain: [
			{
				title: 'Home',
				url: '/',
				icon: HomeIcon,
			},
			{
				title: 'Movie',
				url: '/movie',
				icon: Tv,
			},
			{
				title: 'TV',
				url: '/serial',
				icon: TvMinimalPlay,
			},
			{
				title: 'Actors',
				url: '/actors',
				icon: PersonStandingIcon,
			},
			{
				title: 'Favorites',
				url: '/favorites',
				icon: Bookmark,
			},
		],
	};

	const onLogoHandler = () => {
		dispatch(setActiveUrl('/'));
		navigate('/');
		window.scrollTo(0,0)
	};

	return (
		<Sidebar
			
			variant='inset'
			collapsible='offcanvas'
			{...props}
		>
			<SidebarHeader>
				<div className='flex justify-center items-center h-[45px] mb-1'>
					<img
						onClick={() => onLogoHandler()}
						className='w-[200px] cursor-pointer'
						src={logo}
						alt='Logo'
					/>
				</div>
			</SidebarHeader>
			<Separator />
			<SidebarContent>
				<NavMain items={data.navMain} />
			</SidebarContent>
			{isAuth ? (
				<SidebarFooter>
					<NavUser user={data.user} />
				</SidebarFooter>
			) : null}
		</Sidebar>
	);
}

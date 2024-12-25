import { AppSidebar } from '@/components/app-sidebar';
import { Content } from '@/components/content';
import { Footer } from '@/components/footer';

import { Search } from '@/components/search-form';
import { Button } from '@/components/ui/button';
import { Location } from '@/components/ui/location';
import { Separator } from '@/components/ui/separator';
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from '@/components/ui/sidebar';
import { useAuth } from '@/hooks/use-auth';
import { useNavigate } from 'react-router';

export const Layout = () => {
	const navigate = useNavigate();
	const { isAuth } = useAuth();
	return (
		<>
			<SidebarProvider>
				<AppSidebar />
				<SidebarInset className='flex flex-col min-h-[100vh]'>
					<header className='flex justify-between h-[55px] shrink-0 items-center gap-2'>
						<div className='flex items-center gap-2 px-4'>
							<SidebarTrigger />
							<Separator orientation='vertical' className='mr-2 h-4 block' />
							<Location />
						</div>
						<div className='flex items-center'>
							<Search />
							{!isAuth && (
								<div className='mr-[50px] flex items-center gap-[10px]'>
									<Button
										className='w-[100px]'
										variant={'secondary'}
										onClick={() => navigate('login')}
									>
										Login
									</Button>
									<Button
										onClick={() => navigate('register')}
										className='w-[100px]'
									>
										Sign Up
									</Button>
								</div>
							)}
						</div>
					</header>
					<div className='main flex-1 mx-5 my-3'>
						<Content />
					</div>
					<Footer />
				</SidebarInset>
			</SidebarProvider>
		</>
	);
};

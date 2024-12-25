'use client';

import { ChevronRight, type LucideIcon } from 'lucide-react';

import {
	Collapsible,
	CollapsibleContent,
	CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
	SidebarGroup,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuAction,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarMenuSub,
	SidebarMenuSubButton,
	SidebarMenuSubItem,
} from '@/components/ui/sidebar';
import { setActiveUrl } from '@/store/slices/navigateSlice';
import { AppDispatch, RootState } from '@/store/store';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon: LucideIcon;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	const dispatch = useDispatch<AppDispatch>();
	const activeUrl = useSelector<RootState, string>(
		state => state.navigate.activeUrl
	);

	const setUrl = (url: string) => {
		dispatch(setActiveUrl(url));
		window.scrollTo(0, 0);
	};

	return (
		<SidebarGroup>
			<SidebarGroupLabel>Navigation</SidebarGroupLabel>
			<SidebarMenu>
				{items.map(item => {
					const isActive = item.url === activeUrl;
					return (
						<Collapsible key={item.title} asChild defaultOpen={isActive}>
							<SidebarMenuItem>
								<SidebarMenuButton
									onClick={() => setUrl(item.url)}
									className={
										isActive
											? `bg-slate-100 text-blue-800 hover:bg-slate-100 hover:text-blue-800`
											: 'hover:bg-slate-100 hover:text-blue-800 text-blue-800'
									}
									asChild
									tooltip={item.title}
								>
									<Link to={item.url}>
										<item.icon />
										<span>{item.title}</span>
									</Link>
								</SidebarMenuButton>
								{item.items?.length ? (
									<>
										<CollapsibleTrigger asChild>
											<SidebarMenuAction className='data-[state=open]:rotate-90'>
												<ChevronRight />
												<span className='sr-only'>Toggle</span>
											</SidebarMenuAction>
										</CollapsibleTrigger>
										<CollapsibleContent>
											<SidebarMenuSub>
												{item.items.map(subItem => (
													<SidebarMenuSubItem key={subItem.title}>
														<SidebarMenuSubButton asChild>
															<a
																href={subItem.url}
																className={
																	activeUrl === subItem.url
																		? 'text-black font-bold'
																		: ''
																}
															>
																<span>{subItem.title}</span>
															</a>
														</SidebarMenuSubButton>
													</SidebarMenuSubItem>
												))}
											</SidebarMenuSub>
										</CollapsibleContent>
									</>
								) : null}
							</SidebarMenuItem>
						</Collapsible>
					);
				})}
			</SidebarMenu>
		</SidebarGroup>
	);
}

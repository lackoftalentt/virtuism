import { Separator } from './ui/separator';
import logo from '/src/assets/images/logo.png';

export const Footer = () => {
	return (
		<footer className='bg-white rounded-lg shadow dark:bg-gray-900 mt-4 max-w-full'>
			<div className='max-w-screen-xl mx-auto p-4 md:py-8'>
				<div className='sm:flex sm:items-center sm:justify-between'>
					<a
						target='_blank'
						href='https://github.com/beybarysbb/virtuism'
						className='flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse'
					>
						<img src={logo} className='h-8' alt='Virtuism Logo' />
						<Separator
							orientation='vertical'
							className='mr-2 h-4 block bg-black opacity-90'
						/>
						<span className='self-center text-2xl font-semibold whitespace-nowrap text-blue-800'>
							Virtuism
						</span>
					</a>
					<ul className='flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 gap-6'>
						<li>
							<a
								target='_blank'
								href='https://github.com/beybarysbb'
								className='hover:underline'
							>
								GitHub
							</a>
						</li>
						<li>
							<a
								target='_blank'
								href='https://t.me/llackoftalent'
								className='hover:underline'
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
				<hr className='my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8' />
				<span className='block text-sm text-gray-500 sm:text-center dark:text-gray-400'>
					© 2025{' '}
					<a
						target='_blank'
						href='https://github.com/beybarysbb/virtuism'
						className='hover:underline'
					>
						Virtusm™
					</a>
					. All Rights Reserved.
				</span>
			</div>
		</footer>
	);
};

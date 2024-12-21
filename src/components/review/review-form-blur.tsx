import { useAuth } from '@/hooks/use-auth';
import { Link } from 'react-router-dom';

export const ReviewFormBlur = () => {
	const { isAuth } = useAuth();
	return (
		<main
			className={
				isAuth
					? `absolute w-full flex justify-center h-[150px] opacity-0`
					: 'opacity-100'
			}
		>
			{/* Фон с эффектом размытия */}
			<div className='absolute inset-0 bg-white/30 dark:bg-black/30 backdrop-blur-sm z-10'>
				<div className='relative flex flex-col items-center justify-center z-20 p-4'>
					<h1 className='text-3xl font-bold dark:text-slate-200 text-center'>
						To leave a review you must be logged in 🤨
					</h1>
					<Link
						className='px-4 py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition mt-4'
						to='/register'
					>
						Sign Up
					</Link>
				</div>
			</div>

			{/* Сообщение поверх размытия */}
		</main>
	);
};

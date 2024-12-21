import { Outlet } from 'react-router-dom';

export const Content = () => {
	return (
		<>
			<div className='flex justify-center'>
				<Outlet />
			</div>
		</>
	);
};

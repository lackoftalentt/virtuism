import { Actor } from '@/store/types/types';

export const ActorCard = ({
	name,
	original_name,
	known_for_department,
	profile_path,
}: Actor) => {
	
	return (
		<div className='gap-8 w-[300px] justify-between items-center border-solid border-2 p-2 rounded-xl'>
			<div className=''>
				<img
					className='w-[300px] h-[350px] rounded-xl mr-5'
					src={profile_path ? `https://image.tmdb.org/t/p/w500/${profile_path} ` : '/src/assets/images/profile-icon.svg'}
					alt='Person'
				/>
				<div className=''>
					<h1 className='text-3xl font-bold'>{name}</h1>
					<p className='text-xl font-semibold'>({original_name})</p>
					<p>{known_for_department}</p>
				</div>
			</div>
		</div>
	);
};

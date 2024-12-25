import profileImage from '/src/assets/images/isagi.jpg'

type ReviewsItemProps = {
	userName: string;
	text: string;
};

export const ReviewsItem = ({ userName, text }: ReviewsItemProps) => {
	return (
		<div className='rounded-lg border border-slate-200 bg-white text-slate-950 shadow-sm dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50 mt-3'>
			<div className='space-y-1.5 p-3 flex flex-row items-center justify-between'>
				<div className='flex items-center gap-2'>
					<span className='relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full'>
						<img src={profileImage} alt='Profile image' />
					</span>
					<h3 className='text-xl font-bold font-inter'>
						{userName || 'Anonymous'}
					</h3>
				</div>
			</div>
			<div className='p-4 pt-0'>
				<p className='text-sm dark:text-slate-400 text-slate-950 max-w-[1350px] overflow-hidden break-words'>
					{text || 'No content'}
				</p>
			</div>
		</div>
	);
};

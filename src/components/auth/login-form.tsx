import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/hooks/redux-hooks';
import { setActiveUrl } from '@/store/slices/navigateSlice';
import { setUser } from '@/store/slices/userSlice';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { ArrowLeft, GalleryVerticalEnd } from 'lucide-react';
import { useState } from 'react';

export const LoginForm = () => {
	const [email, setEmail] = useState('');
	const [error, setError] = useState('');
	const [pass, setPass] = useState('');
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleLogin = async () => {
		if (!email.trim()) {
			setError('Email is required.');
			return;
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		if (!emailRegex.test(email)) {
			setError('Please enter a valid email address.');
		}

		if (!pass.trim()) {
			setError('Password is required.');
			return;
		}
		const auth = getAuth();
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				pass
			);
			const user = userCredential.user;
			const token = await user.getIdToken();
			dispatch(
				setUser({
					email: user.email,
					userId: user.uid,
					token: token,
					userName: user.displayName,
				}),
				dispatch(setActiveUrl('/')),
				navigate('/')
			);
		} catch (error: any) {
			if (error.code === 'auth/user-not-found') {
				setError('No user found with this email.');
			} else if (error.code === 'auth/wrong-password') {
				setError('Incorrect password.');
			} else {
				setError('An unexpected error occurred. Please try again.');
			}
		}
	};

	return (
		<>
			<div className='inline-flex justify-center items-center flex-col'>
				<a className='flex items-center gap-2 self-center font-medium cursor-default mb-[30px]'>
					<div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
						<GalleryVerticalEnd className='size-4' />
					</div>
					LackofTalent.
				</a>
				<Card className='mx-auto max-w-sm'>
					<CardHeader>
						<CardTitle className='text-2xl'>Login</CardTitle>
						<CardDescription>
							Enter your email below to login to your account
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='grid gap-4'>
							<div className='grid gap-2'>
								<Label htmlFor='email'>Email</Label>
								<Input
									id='email'
									type='email'
									placeholder='m@example.com'
									value={email}
									onChange={e => setEmail(e.target.value)}
									required
								/>
							</div>
							<div className='grid gap-2'>
								<div className='flex items-center'>
									<Label htmlFor='password'>Password</Label>
								</div>
								<Input
									id='password'
									value={pass}
									onChange={e => setPass(e.target.value)}
									placeholder='password'
									type='password'
									required
								/>
							</div>
							{error && (
								<p className='text-center font-semibold text-red-700'>
									{error}
								</p>
							)}
							<Button type='submit' className='w-full' onClick={handleLogin}>
								Login
							</Button>
						</div>
						<div className='mt-4 text-center text-sm'>
							Don&apos;t have an account?{' '}
							<Link to='/register' className='underline'>
								Sign up
							</Link>
						</div>
						<div
							className='inline-flex mt-4 items-center cursor-pointer opacity-60'
							onClick={() => navigate('/')}
						>
							<ArrowLeft size={'16px'} />
							<p className='text-center text-sm '>Home</p>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	);
};

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
import { FirebaseError } from 'firebase/app';
import { ArrowLeft, GalleryVerticalEnd } from 'lucide-react';

import {
	createUserWithEmailAndPassword,
	getAuth,
	updateProfile,
} from 'firebase/auth';
import { useState } from 'react';

export const RegisterForm = () => {
	const [email, setEmail] = useState<string>('');
	const [userName, setUserName] = useState<string>('');
	const [pass, setPass] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [secondPass, setSecondPass] = useState<string>('');
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const dispatch = useAppDispatch();
	const navigate = useNavigate();

	const handleRegister = async (): Promise<void> => {
		if (pass !== secondPass) {
			setError('Passwords do not match');
			return;
		}
		if (!userName.trim()) {
			setError('Username is required.');
			return;
		}
		const auth = getAuth();
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				pass
			);
			const user = userCredential.user;

			await updateProfile(user, {
				displayName: userName,
			});

			const token = await user.getIdToken();
			dispatch(
				setUser({
					email: user.email,
					userId: user.uid,
					token: token,
					userName: user.displayName,
				})
			);
			setError(null);
			dispatch(setActiveUrl('/'));
			navigate('/');
		} catch (error) {
			if (error instanceof FirebaseError) {
				switch (error.code) {
					case 'auth/email-already-in-use':
						setError('This email is already in use.');
						break;
					case 'auth/weak-password':
						setError('Password should be at least 6 characters.');
						break;
					case 'auth/invalid-email':
						setError('Invalid email address.');
						break;
					default:
						setError('Registration failed. Please try again.');
				}
			} else {
				setError('An unexpected error occurred.');
			}
			setError('Registration error:');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className='inline-flex justify-center items-center flex-col'>
			<a className='flex items-center gap-2 self-center font-medium cursor-default mb-[30px]'>
				<div className='flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground'>
					<GalleryVerticalEnd className='size-4' />
				</div>
				LackofTalent.
			</a>
			<Card className='mx-auto max-w-sm'>
				<CardHeader>
					<CardTitle className='text-2xl'>Create your account</CardTitle>
					<CardDescription>
						Please fill out the form below to create an account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='grid gap-4'>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Username</Label>
							<Input
								id='username'
								value={userName}
								onChange={e => setUserName(e.target.value)}
								placeholder='name'
							/>
						</div>
						<div className='grid gap-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								type='email'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder='m@example.com'
								required
							/>
						</div>
						<div className='grid gap-2'>
							<div className='flex items-center'>
								<Label htmlFor='password'>Password</Label>
							</div>
							<Input
								id='password'
								type='password'
								placeholder='password'
								value={pass}
								onChange={e => setPass(e.target.value)}
								required
							/>
						</div>
						<div className='grid gap-2'>
							<div className='flex items-center'>
								<Label htmlFor='password'>Confirm the password</Label>
							</div>
							<Input
								id='password'
								type='password'
								placeholder='confirm password'
								value={secondPass}
								onChange={e => setSecondPass(e.target.value)}
								required
							/>
						</div>
						{error && (
							<div className='p-2 mt-2 text-sm text-red-600 border border-red-400 rounded-md'>
								{error}
							</div>
						)}
						<Button type='submit' className='w-full' onClick={handleRegister}>
							{isLoading ? 'Signing Up...' : 'Sign Up'}
						</Button>
					</div>
					<div className='mt-4 text-center text-sm'>
						Already have an account?{' '}
						<Link to='/login' className='underline'>
							Log in
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
	);
};

import { UserState } from '@/store/slices/userSlice';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

export function useAuth() {
	const { email, token, userId, userName } = useSelector<RootState, UserState>(
		state => state.user
	);
	const isAuth = !!token;

	return { isAuth, email, token, userId, userName };
}

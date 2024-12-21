import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
	userName: string | null;
	email: string | null;
	token: string | null;
	userId: string | null;
}

const initialState: UserState = {
	userName: null,
	token: null,
	email: null,
	userId: null,
};

const userReducer = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action: PayloadAction<UserState>) {
			state.token = action.payload.token;
			state.userName = action.payload.userName;
			state.email = action.payload.email;
			state.userId = action.payload.userId;
		},
		removeUser(state) {
			state.email = null;
			state.userName = null;
			state.token = null;
			state.userId = null;
		},
	},
});

export const { setUser, removeUser } = userReducer.actions;
export default userReducer.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface navigateState {
	activeUrl: string
}

const initialState:navigateState = {
	activeUrl: '/'
}

const navigateSlice = createSlice({
	name:'navigate',
	initialState,
	reducers:{
		setActiveUrl(state, action){
			state.activeUrl = action.payload
		}
	}
})

export default navigateSlice.reducer
export const { setActiveUrl } = navigateSlice.actions
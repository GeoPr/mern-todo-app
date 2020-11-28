import { SET_USER_INFO } from './actionsTypes';

export const setUserInfo = (token: string, userId: string) => ({
	type: SET_USER_INFO,
	payload: { token, userId }  
} as const)
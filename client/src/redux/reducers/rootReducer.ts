import { authReducer } from './authReducer/authReducer';
import { todosReducer } from './todosReducer/todosReducer';
import { loaderReducer } from './loaderReducer/loaderReducer';
import { combineReducers } from 'redux'

export const rootReducer = combineReducers({
	loader: loaderReducer,
	todos: todosReducer,
	auth: authReducer
})

export type TApp = ReturnType<typeof rootReducer>

type TProperties<T> = T extends {
	[key: string]: infer U
} ? U : never

export type TActions<T extends {
	[key: string]: (...args: any[]) => any
}> = ReturnType<TProperties<T>>
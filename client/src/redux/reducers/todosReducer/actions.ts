import { SET_TODOS } from './actionsTypes';
import { ITodo } from './todosReducer'

export const setTodos = (todos: Array<ITodo>) => ({
	type: SET_TODOS,
	payload: { todos }
} as const) 
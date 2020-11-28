import { SET_TODOS } from './actionsTypes';
import { TActions } from './../rootReducer';
import * as actions from './actions'

export interface ITodo {
	completed: boolean
	id: string
	title: string
}

type TInitalState = Array<ITodo>

const initalState: TInitalState = []

type ActionsTypes = TActions<typeof actions>

export const todosReducer = (
	state: TInitalState = initalState,
	action: ActionsTypes
): TInitalState => {
	if (action.type === SET_TODOS) {
		return action.payload.todos
	}

	return state
}
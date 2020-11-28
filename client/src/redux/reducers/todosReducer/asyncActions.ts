import { TApp, TActions } from './../rootReducer'
import { ThunkAction } from 'redux-thunk'
import * as actions from './actions'
import * as loaderActions from '../loaderReducer/actions'
import axios from 'axios'

type ActionsTypes = TActions<typeof actions> | TActions<typeof loaderActions>

type TThunk = ThunkAction<Promise<any>, TApp, unknown, ActionsTypes>

export const getTodos = (token: string): TThunk => async dispatch => {
  dispatch(loaderActions.showLoader())

  try {
    const todos = await axios.get('/api/todos', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    dispatch(actions.setTodos(todos.data))
  } catch (e) {}

  dispatch(loaderActions.hideLoader())
}

export const createTodo = (
  token: string,
  title: string,
): TThunk => async dispatch => {
  dispatch(loaderActions.showLoader())

  try {
    const id = Date.now().toString()

    await axios.post(
      '/api/todos/create',
      { id, title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const todos = await dispatch(getTodos(token))
    dispatch(actions.setTodos(todos.data))
  } catch (e) {}

  dispatch(loaderActions.hideLoader())
}

export const removeTodo = (
  token: string,
  id: string,
): TThunk => async dispatch => {
  dispatch(loaderActions.showLoader())

  try {
    await axios.post(
      '/api/todos/remove',
      { id },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const todos = await dispatch(getTodos(token))
    dispatch(actions.setTodos(todos.data))
  } catch (e) {}

  dispatch(loaderActions.hideLoader())
}

export const changeTodo = (
  token: string,
  id: string,
  isCompleted: boolean
): TThunk => async dispatch => {
  dispatch(loaderActions.showLoader())

  try {
    await axios.post(
      '/api/todos/change',
      { id, isCompleted },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    const todos = await dispatch(getTodos(token))
    dispatch(actions.setTodos(todos.data))
  } catch (e) {}

  dispatch(loaderActions.hideLoader())
}

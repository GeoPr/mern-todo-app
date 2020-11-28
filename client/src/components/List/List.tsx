import { Button, Checkbox, FormControlLabel } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TApp } from '../../redux/reducers/rootReducer'
import {
  changeTodo,
  getTodos,
  removeTodo,
} from '../../redux/reducers/todosReducer/asyncActions'
import './List.scss'

export const List: React.FC = () => {
  const todos = useSelector((state: TApp) => state.todos)
  const dispatch = useDispatch()
  const { token } = useSelector((state: TApp) => state.auth)

  useEffect(() => {
    dispatch(getTodos(token))
  }, [getTodos])

  const clickHandler = (id: string) => {
    dispatch(removeTodo(token, id))
  }

  const changeHandler = (id: string, isCompleted: boolean) => {
    dispatch(changeTodo(token, id, isCompleted))
  }

  return (
    <ul className="todos__list">
      {todos.length
        ? todos.map(todo => {
            return (
              <li key={todo.id}>
                <FormControlLabel
                  value="start"
                  label={todo.title}
                  control={
                    <Checkbox
                      color="primary"
                      checked={todo.completed}
                      onChange={() => changeHandler(todo.id, todo.completed)}
                    />
                  }
                />
                <Button
                  color="secondary"
                  variant="contained"
                  onClick={() => clickHandler(todo.id)}>
                  Remove
                </Button>
              </li>
            )
          })
        : ''}
    </ul>
  )
}

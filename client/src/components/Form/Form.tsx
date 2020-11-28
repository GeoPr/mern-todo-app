import { Button, TextField } from '@material-ui/core'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import './Form.scss'
import { useDispatch, useSelector } from 'react-redux'
import { createTodo } from '../../redux/reducers/todosReducer/asyncActions'
import { TApp } from '../../redux/reducers/rootReducer'

interface IData {
  todo: string
}

const schema = yup.object().shape({
  todo: yup.string().required('It cannot be empty'),
})

export const Form: React.FC = () => {
  const { register, handleSubmit, errors, reset } = useForm<IData>({
    resolver: yupResolver(schema),
	})
  const dispatch = useDispatch()
  const { token } = useSelector((state: TApp) => state.auth)

  const submitHandler = handleSubmit(async data => {
		try {
      await dispatch(createTodo(token, data.todo))
      reset()
		} catch (e) {}
	})

  return (
    <form
      className="todos__form"
      action="#"
      noValidate
      onSubmit={submitHandler}
		>
      <TextField
        type="text"
        label="Todo"
				name="todo"
				variant="filled"
        inputRef={register({ required: true })}
        error={!!errors.todo}
        helperText={errors.todo?.message}
      />
      <Button color="primary" variant="contained" type="submit">
        Add
      </Button>
    </form>
  )
}

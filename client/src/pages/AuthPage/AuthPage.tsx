import React, { useState } from 'react'
import { Button, TextField } from '@material-ui/core'
import * as yup from 'yup'
import './AuthPage.scss'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useDispatch } from 'react-redux'
import { signUp, login } from '../../redux/reducers/authReducer/asyncActions'

interface IData {
  email: string
  password: string
}

const schema = yup.object().shape({
  email: yup
    .string()
    .email('There is not email like this')
    .required('Email is the required field'),
  password: yup
    .string()
    .min(6, 'Min length of password is 6 sybmols')
    .required('Password is the required field'),
})

export const AuthPage: React.FC = () => {
  const { handleSubmit, errors, reset, register } = useForm<IData>({
    resolver: yupResolver(schema),
  })
  const [action, setAction] = useState('')
  const dispatch = useDispatch()

  const submitHandler = handleSubmit(async data => {
    if (action === 'sign up') {
      await dispatch(signUp(data.email, data.password))
    } else {
      await dispatch(login(data.email, data.password))
    }

    reset()
  })

  return (
    <div className="auth">
      <div className="auth__body">
        <form className="auth__form" action="#" noValidate onSubmit={submitHandler}>
          <TextField
            type="email"
            autoComplete="off"
            label="Your email"
            variant="outlined"
            error={!!errors.email}
            helperText={errors.email?.message}
            name="email"
            inputRef={register({ required: true })}
          />
          <TextField
            type="password"
            autoComplete="off"
            label="Your password"
            variant="outlined"
            error={!!errors.password}
            helperText={errors.password?.message}
            name="password"
            inputRef={register({ required: true })}
          />
          <div className="auth__buttons">
            <Button
              type="submit"
              color="primary"
              variant="contained"
              onClick={() => setAction('sign up')}>
              Sign Up
            </Button>
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={() => setAction('login')}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

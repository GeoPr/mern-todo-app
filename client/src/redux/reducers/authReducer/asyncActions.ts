import { ThunkAction } from 'redux-thunk'
import { TActions, TApp } from './../rootReducer'
import axios, { AxiosResponse } from 'axios'
import Swal from 'sweetalert2'
import * as actions from './actions'
import * as loaderActions from '../loaderReducer/actions'

const modalTypes = {
  success: 'Success' as const,
  error: 'Error' as const
}

type TModal = typeof modalTypes.success | typeof modalTypes.error

type ActionsTypes =
  | TActions<typeof actions>
  | TActions<typeof loaderActions>

type TThunk = ThunkAction<Promise<any>, TApp, unknown, ActionsTypes>

interface IRegisterResponse extends AxiosResponse {
  data: {
    message: string
  }
}

interface ILoginResponse extends AxiosResponse {
  data: {
    token: string
    userId: string
  }
}

export const signUp = (
  email: string,
  password: string,
): TThunk => async dispatch => {
  dispatch(loaderActions.showLoader())

  try {
    const response: IRegisterResponse = await axios.post('/api/auth/register', {
      email,
      password,
    })

    if (response.status === 200) {
      showModal(response.data.message, modalTypes.success)
    }
  } catch (e) {
    showModal(e.response.data.message, modalTypes.error)
  }

  dispatch(loaderActions.hideLoader())
}

export const login = (
  email: string,
  password: string,
): TThunk => async dispatch => {
  dispatch(loaderActions.showLoader())

  try {
    const response: ILoginResponse = await axios.post('/api/auth/login', {
      email,
      password,
    })

    if (response.status === 200) {
      const { token, userId } = response.data
      dispatch(actions.setUserInfo(token, userId))
    }
  } catch (e) {
    showModal(e.response.data.message, modalTypes.error)
  }

  dispatch(loaderActions.hideLoader())
}

function showModal(text: string, type: TModal) {
  Swal.fire({
    title: type,
    text: text,
    confirmButtonText: 'Close',
    icon: type === modalTypes.success ? 'success' : 'error'
  })
}

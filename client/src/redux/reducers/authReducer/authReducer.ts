import { SET_USER_INFO } from './actionsTypes'
import { TActions } from './../rootReducer'
import * as actions from './actions'

interface IInitalState {
  token: string
  userId: string
}

const initalState: IInitalState = JSON.parse(
  localStorage.getItem('userInfo')!,
) ?? { token: '', userId: '' }

type ActionsTypes = TActions<typeof actions>

export const authReducer = (
  state: IInitalState = initalState,
  action: ActionsTypes,
): IInitalState => {
  if (action.type === SET_USER_INFO) {
    const { userId, token } = action.payload

    localStorage.setItem(
      'userInfo',
      JSON.stringify({
        userId,
        token,
      }),
    )

    return { ...state, userId, token }
  }

  return state
}

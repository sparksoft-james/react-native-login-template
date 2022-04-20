// eslint-disable-next-line import/no-cycle
import { LOGIN } from './login.action'

const initialState = {
  api_token: false,
  fetching: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOGIN.PENDING:
      return { ...state, fetching: true }

    case LOGIN.SUCCESS:
      return {
        ...state,
        ...action.payload,
        api_token: action.api_token,
        fetching: false,
        error: '',
      }

    case LOGIN.ERROR:
      return { ...state, fetching: false, error: action.error }

    case LOGIN.RESET:
      return { ...{} }

    default:
      return state
  }
}

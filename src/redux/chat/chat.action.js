import { actions } from '../../store/utils'
// eslint-disable-next-line import/no-cycle
import { request } from '../../utils/api'

// Action types
export const CHAT = actions('CHAT')

export const getUser = () => async (dispatch) => {
  dispatch({
    type: CHAT.PENDING,
  })
  const URL = `/users`
  // console.log('URL', URL)
  const res = await request.get(URL).catch((error) => {
    dispatch({
      type: CHAT.ERROR,
      error: error.message,
    })
  })

  if (res && res.data) {
    dispatch({
      type: CHAT.SUCCESS,
      payload: res.data,
      api_token: true,
    })
  }
}

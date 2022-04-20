import { actions } from '../../store/utils'
// eslint-disable-next-line import/no-cycle
import { request } from '../../utils/api'

// Action types
export const LOGIN = actions('LOGIN')

// Action
export const login = (username, password, navigation) => async (dispatch) => {
  dispatch({
    type: LOGIN.PENDING,
  })

  const res = await request
    .post(
      '/users/login',
      JSON.stringify({
        username,
        password,
      })
    )
    .catch((error) => {
      dispatch({
        type: LOGIN.ERROR,
        error: error.message,
      })
    })

  if (res && res.data) {
    console.log(res)
    dispatch({
      type: LOGIN.SUCCESS,
      payload: res.data,
      api_token: true,
    })
    navigation.reset({
      index: 0,
      routes: [{ name: 'Collection' }],
    })
  }
}

export const logout = (navigation) => async (dispatch) => {
  console.log('hi')
  dispatch({
    type: LOGIN.SUCCESS,
    payload: {},
    api_token: false,
  })
  navigation.navigate({
    index: 0,
    routes: [{ name: 'StartScreen' }],
  })
}

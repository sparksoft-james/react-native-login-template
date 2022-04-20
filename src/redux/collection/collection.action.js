import { actions } from '../../store/utils'
// eslint-disable-next-line import/no-cycle
import { request } from '../../utils/api'

// Action types
export const COLLECTION = actions('COLLECTION')

export const getCollection =
  (user_id, type = null) =>
  async (dispatch) => {
    dispatch({
      type: COLLECTION.PENDING,
    })
    const URL = `/users/collection/${user_id}?type=${type}`
    console.log('URL', URL)
    const res = await request.get(URL).catch((error) => {
      dispatch({
        type: COLLECTION.ERROR,
        error: error.message,
      })
    })

    if (res && res.data) {
      dispatch({
        type: COLLECTION.SUCCESS,
        data_type: type,
        payload: res.data,
        api_token: true,
      })
    }
  }

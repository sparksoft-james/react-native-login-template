import { actions } from '../../store/utils'
// eslint-disable-next-line import/no-cycle
import { request } from '../../utils/api'
import { showToast } from '../../utils/function'
// Action types
export const COLLECTION = actions('COLLECTION')

export const getCollection =
  (user_id, type = null) =>
  async (dispatch) => {
    dispatch({
      type: COLLECTION.PENDING,
    })
    const URL = `/users/collection/${user_id}?type=${type}`
    const res = await request.get(URL).catch((error) => {
      dispatch({
        type: COLLECTION.ERROR,
        error: error.message,
      })
    })

    if (res && res.data) {
      // console.log('res', res)
      dispatch({
        type: COLLECTION.SUCCESS,
        data_type: type,
        payload: res.data,
      })
    }
  }

export const postCollection = (payload) => async (dispatch) => {
  dispatch({
    type: COLLECTION.PENDING,
  })
  // const URL = `/collection/store`
  const res = await request
    .postFormData('/collection/store', payload)
    .catch((error) => {
      dispatch({
        type: COLLECTION.ERROR,
        error: error.message,
      })
    })

  if (res) {
    dispatch({
      type: COLLECTION.SUCCESS,
    })
    console.log('weeee', res)
    showToast(res.responseMessage)
    getCollection()
  }
}

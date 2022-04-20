import { CHAT } from './chat.action'
// import { BOOK_TYPE, MUSIC_TYPE, IMAGE_TYPE } from '../../utils/constant'

const initialState = {
  user: null,

  fetching: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case CHAT.PENDING:
      return { ...state, fetching: true }

    case CHAT.SUCCESS:
      return {
        ...state,
        user: action.payload,
        fetching: false,
        error: '',
      }

    case CHAT.ERROR:
      return { ...state, fetching: false, error: action.error }
    default:
      return state
  }
}

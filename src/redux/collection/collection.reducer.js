import { COLLECTION } from './collection.action'
import {
  BOOK_TYPE,
  MUSIC_TYPE,
  IMAGE_TYPE,
  FILE_TYPE,
} from '../../utils/constant'

const initialState = {
  book: null,
  music: null,
  file: null,
  image: null,
  fetching: false,
}

export default (state = initialState, action = {}) => {
  switch (action.type) {
    case COLLECTION.PENDING:
      return { ...state, fetching: true }

    case COLLECTION.SUCCESS:
      if (action.data_type === BOOK_TYPE) {
        return {
          ...state,
          book: action.payload,
          fetching: false,
          error: '',
        }
      }
      if (action.data_type === FILE_TYPE) {
        return {
          ...state,
          file: action.payload,
          fetching: false,
          error: '',
        }
      }
      if (action.data_type === MUSIC_TYPE) {
        return {
          ...state,
          music: action.payload,
          fetching: false,
          error: '',
        }
      }
      if (action.data_type === IMAGE_TYPE) {
        return {
          ...state,
          image: action.payload,
          fetching: false,
          error: '',
        }
      }
      return {
        ...state,
        fetching: false,
        error: '',
      }

    case COLLECTION.ERROR:
      return { ...state, fetching: false, error: action.error }
    default:
      return state
  }
}

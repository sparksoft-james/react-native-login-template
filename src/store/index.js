import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer, persistStore } from 'redux-persist'
// eslint-disable-next-line import/no-cycle
import loginReducer from '../redux/auth/login.reducer'
import collectionReducer from '../redux/collection/collection.reducer'
import chatReducer from '../redux/chat/chat.reducer'
// import {
//   clientReducer,
//   callClientApi,
// } from '../Screens/Clients/AddClient/client.reducer'

const reducers = combineReducers({
  user: loginReducer,
  collection: collectionReducer,
  chat: chatReducer,
})

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user'],
}
const persistedReducer = persistReducer(persistConfig, reducers)

const middlewares = [thunk]

// eslint-disable-next-line no-undef
if (__DEV__) {
  middlewares.push(logger)
}

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(...middlewares))
  const persistor = persistStore(store)

  return { store, persistor }
}

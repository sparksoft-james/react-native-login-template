import React, { useState } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Provider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNav from './src/navigation/BottomTabNav'
import { theme } from './src/core/theme'
import AuthStack from './src/navigation/AuthStack'
import Entry from './src/navigation/Entry'

// eslint-disable-next-line import/no-cycle
import createStore from './src/store'

export const { store, persistor } = createStore()

export default function App() {
  const [showNav, setShowNav] = useState(false)

  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <StoreProvider store={store}>
          {/* {console.log('current token', store.getState().user.api_token)} */}
          {/* {store.getState().user.api_token ? <BottomTabNav /> : <AuthStack />} */}
          <Entry />
        </StoreProvider>
      </NavigationContainer>
    </Provider>
  )
}

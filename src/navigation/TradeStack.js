import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { TradeScreen, TradeCreateScreen } from '../screens'

const Stack = createStackNavigator()

export default function TradeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Trade"
      tabBarOptions={{
        activeTintColor: '#808080',
      }}
    >
      <Stack.Screen name="Trade" component={TradeScreen} />
      <Stack.Screen name="TradeCreate" component={TradeCreateScreen} />
    </Stack.Navigator>
  )
}

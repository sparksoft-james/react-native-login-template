import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { MessageScreen, MesaageDetailsScreen } from '../screens'

const Stack = createStackNavigator()

export default function MessageStack() {
  return (
    <Stack.Navigator
      initialRouteName="Trade"
      tabBarOptions={{
        activeTintColor: '#808080',
      }}
    >
      <Stack.Screen name="Message" component={MessageScreen} />
      <Stack.Screen name="MessageDetails" component={MesaageDetailsScreen} />
    </Stack.Navigator>
  )
}

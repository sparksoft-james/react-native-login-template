import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import {
  CollectionScreen,
  CollectionDetailsScreen,
  CollectionCreateScreen,
} from '../screens'

const Stack = createStackNavigator()

export default function CollectionStack() {
  return (
    <Stack.Navigator
      initialRouteName="Collection"
      tabBarOptions={{
        activeTintColor: '#808080',
      }}
    >
      <Stack.Screen name="Collection" component={CollectionScreen} />
      <Stack.Screen
        name="CollectionDetails"
        component={CollectionDetailsScreen}
      />
      <Stack.Screen
        name="CollectionCreate"
        component={CollectionCreateScreen}
      />
    </Stack.Navigator>
  )
}

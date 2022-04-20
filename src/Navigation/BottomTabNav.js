import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// import { primary } from '../Utils/customTheme'
import CustomTabBar from './components/CustomTabBar'
// import Collection from '../screens/Collection'
import CollectionStack from './CollectionStack'
import TradeStack from './TradeStack'
import MessageStack from './MessageStack'
import { ProfileScreen } from '../screens'

const Tab = createBottomTabNavigator()

export default function BottomTabNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        unmountOnBlur: true,
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Collection" component={CollectionStack} />
      <Tab.Screen name="Message" component={MessageStack} />
      <Tab.Screen name="Trade" component={TradeStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

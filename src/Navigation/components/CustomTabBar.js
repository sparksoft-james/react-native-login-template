import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { primary } from '~/Utils/customTheme'

export default function CustomTabBar({ state, navigation }) {
  const { routes } = state
  let image = 'home' //require('../../assets/report.png');

  const tabBar = routes.map((route, index) => {
    const isFocused = state.index === index

    if (route.name === 'Clients') {
      image = 'users' //require('../../assets/clients.png');
    } else if (route.name === 'Plans') {
      image = 'list' //require('../../assets/plans.png');
    } else if (route.name === 'Report') {
      image = 'file-text' //require('../../assets/plans.png');
    } else if (route.name === 'Profile') {
      image = 'user' //require('../../assets/profile.png');
    }

    const onPress = () => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
      })

      if (!isFocused && !event.defaultPrevented) {
        navigation.navigate(route.name)
      }
    }

    const onLongPress = () => {
      navigation.emit({
        type: 'tabLongPress',
        target: route.key,
      })
    }

    const labelColor = { color: isFocused ? primary : '#222' }
    const imageColor = isFocused ? styles.activeImage : styles.incativeState

    return (
      <TouchableOpacity
        key={route.name}
        accessibilityRole="button"
        accessibilityStates={isFocused ? ['selected'] : []}
        onPress={onPress}
        onLongPress={onLongPress}
        style={styles.tabbarButton}
      >
        <Icon name={image} size={25} style={[styles.image, imageColor]} />
        <Text style={labelColor}>{route.name}</Text>
      </TouchableOpacity>
    )
  })

  return (
    <View testID="bottom-tab-bar" style={styles.container}>
      {tabBar}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 15,
    shadowColor: Colors.grey400,
    shadowOffset: { height: 3, width: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    backgroundColor: Colors.white,
  },
  image: {
    // height: 20,
    // width: 20,
    marginBottom: 5,
  },
  activeImage: {
    color: primary,
  },
  incativeState: {
    color: '#808080',
  },
  tabbarButton: {
    flex: 1,
    alignItems: 'center',
  },
})

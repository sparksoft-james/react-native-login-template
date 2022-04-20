import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text, Colors } from 'react-native-paper'
import Icon from 'react-native-vector-icons/FontAwesome'
import { theme } from '../../core/theme'

export default function CustomTabBar({ state, navigation }) {
  const { routes } = state
  // let image = 'home' //require('../../assets/report.png');

  const tabBar = routes.map((route, index) => {
    const isFocused = state.index === index
    let image = 'home'
    if (route.name === 'Collection') {
      image = 'home'
    } else if (route.name === 'Message') {
      image = 'comment'
    } else if (route.name === 'Trade') {
      image = 'exchange'
    } else if (route.name === 'Profile') {
      image = 'user'
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
        <Text style={styles.label}>{route.name}</Text>
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
    paddingVertical: 25,
    backgroundColor: Colors.white,
    borderTopWidth: 0.5,
    borderTopColor: theme.colors.primary,
  },
  label: {
    fontSize: theme.fontSize.paragraph,
  },
  image: {
    marginBottom: 5,
  },
  activeImage: {
    color: Colors.black,
  },
  incativeState: {
    color: theme.colors.primary,
  },
  tabbarButton: {
    flex: 1,
    alignItems: 'center',
  },
})

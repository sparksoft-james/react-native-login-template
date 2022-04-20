import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { scale } from 'react-native-size-matters'
import { theme } from '../core/theme'

export default function Header(props) {
  const {
    title,
    navigation = null,
    route = null,
    view = false,
    create = false,
  } = props
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.header}>{title}</Text>
      <TouchableOpacity>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        {view && (
          <Text
            style={styles.icon}
            // eslint-disable-next-line react/destructuring-assignment
            onPress={() => navigation.navigate(route, { title })}
          >
            View More
          </Text>
        )}
        {create && (
          <IconButton
            size={theme.fontSize.icon}
            onPress={() => navigation.navigate(route, { title })}
            icon="plus"
          />
        )}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: theme.fontSize.title,
    color: theme.colors.text,
    fontWeight: 'bold',
  },
  icon: {
    fontSize: theme.fontSize.paragraph,
    color: theme.colors.primary,
    fontStyle: 'italic',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 4,
    alignItems: 'center',
  },
})

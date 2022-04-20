import React from 'react'
import { Image, StyleSheet, View } from 'react-native'

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <Image source={require('../assets/logo.png')} style={styles.image} />
    </View>
  )
}

const styles = StyleSheet.create({
  logoContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  image: {
    width: 110,
    height: 110,
    marginBottom: 8,
  },
})

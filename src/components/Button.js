import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'

export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      style={[
        styles.button,
        mode === 'outlined' && {
          backgroundColor: theme.colors.white,
        },
        style,
      ]}
      labelStyle={[
        styles.text,
        mode === 'outlined' && {
          color: theme.colors.primary,
        },
      ]}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    color: theme.colors.white,
    fontSize: 15,
    lineHeight: 26,
  },
})

import { DefaultTheme } from 'react-native-paper'
import { scale } from 'react-native-size-matters'

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    text: '#000000',
    primary: '#808080',
    secondary: '#414757',
    white: '#ffffff',
    success: '#1bb11b',
    error: '#f13a59',
    lightGrey: '#ececec',
  },
  fontSize: {
    title: scale(15),
    secondaryTitle: scale(13),
    subtitle: scale(10),
    paragraph: scale(8),
    icon: scale(15),
  },
}

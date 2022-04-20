import React, { useState, useEffect } from 'react'
import { Avatar, Input, ListItem, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'

import {
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native'
import { scale } from 'react-native-size-matters'
import Background from '../components/Background'
import { theme } from '../core/theme'
import Header from '../components/Header'

export default function MessageDetails({ route, navigation }) {
  const { item } = route.params

  const [data, setData] = useState([
    { message: 'simple text', from: 1, to: 2, created_at: '12:00' },
    { message: 'simple text', from: 1, to: 2, created_at: '12:00' },
    { message: 'simple text', from: 1, to: 2, created_at: '12:00' },
    { message: 'simple text', from: 1, to: 2, created_at: '12:00' },
    { message: 'simple text', from: 1, to: 2, created_at: '12:00' },
  ])
  // useEffect(() => {
  //   console.log(route, 'here is route')
  // }, [])
  // console.log(route)
  return (
    <Background>
      <Header title={item.name} />
      <ScrollView style={styles.mainContainer}>
        {data &&
          data.map((chat) => (
            <View style={styles.chatItemContainer}>
              <Text style={styles.chatItemText}>{chat.message}</Text>
              <Text style={styles.chatTimestamp}>{chat.created_at}</Text>
            </View>
          ))}
      </ScrollView>
      <View style={styles.searchBoxContainer}>
        <Input placeholder="Text write here" />
        <TouchableOpacity>
          <Icon name="send" size={24} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  chatItemContainer: {
    width: '50%',
    flexBasis: 'auto',
    flexDirection: 'column',
  },
  chatItemText: {
    paddingHorizontal: scale(10),
    paddingVertical: scale(8),
    marginVertical: scale(4),
    borderRadius: scale(30),
    backgroundColor: theme.colors.lightGrey,
    fontSize: theme.fontSize.paragraph,
  },
  // chatItemText: {
  // },
  chatListItem: {
    height: 100,
  },
  chatName: {
    fontSize: theme.fontSize.subtitle,
  },
  chatDesc: {
    fontSize: theme.fontSize.paragraph,
  },
  searchBoxContainer: {
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: scale(10),
    bottom: 0,
    marginHorizontal: scale(5),
  },
})

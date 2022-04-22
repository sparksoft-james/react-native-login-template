import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
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
import { request } from '../utils/api'

function MessageDetails({ route, navigation, user }) {
  const { item } = route.params

  const [message, setMessage] = useState()
  const [messageText, setMessageText] = useState()

  const delay = (ms) => new Promise((res) => setTimeout(res, ms))
  useEffect(async () => {
    await delay(5000)
    refreshMessage()
  }, [true])

  const refreshMessage = async () => {
    const URL = `/chat/getMessage?user_id=${user.id}&target_user_id=${item.id}`
    const res = await request.get(URL)
    if (res.data) {
      setMessage(res.data)
    }
  }

  const sendMessage = async () => {
    const URL = `/chat/send?from_id=${user.id}&to_id=${item.id}&message=${messageText}&channel_id=${message.channel_id}`
    await request.post(URL)
    setMessageText('')
    refreshMessage()
  }

  return (
    <Background>
      <Header
        title={item.name}
        item={item}
        navigation={navigation}
        route="TradeCreate"
        create
      />
      <ScrollView style={styles.mainContainer}>
        {message &&
          message.messages &&
          message.messages.map((chat, index) => (
            <View
              key={index}
              style={
                // eslint-disable-next-line eqeqeq
                chat.from_id == user.id
                  ? [styles.chatItemContainer]
                  : [styles.chatItemLeftContainer]
              }
            >
              <Text style={styles.chatItemText}>{chat.message}</Text>
              <Text style={styles.chatTimestamp}>
                {chat.created_at
                  ? chat.created_at.substring(
                      chat.created_at.indexOf('T') + 1,
                      chat.created_at.lastIndexOf(':')
                    )
                  : ''}
              </Text>
            </View>
          ))}
      </ScrollView>
      <View style={styles.searchBoxContainer}>
        <View style={styles.inputContainer}>
          <Input
            placeholder="Text write here"
            value={messageText}
            onChangeText={(val) => {
              setMessageText(val)
            }}
            onSubmitEditing={sendMessage}
          />
        </View>
        <TouchableOpacity onPress={sendMessage}>
          <Icon name="send" size={scale(16)} color={theme.colors.primary} />
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  chatItemContainer: {
    width: 'auto',
    flexDirection: 'column',
    alignSelf: 'flex-end',
  },
  chatItemLeftContainer: {
    width: 'auto',
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
    backgroundColor: theme.colors.white,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: -20,
  },
  inputContainer: {
    width: '92%',
    marginRight: scale(5),
    // width: '100%',
    // marginHorizontal: scale(10),
  },
})

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) => bindActionCreators({}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MessageDetails)

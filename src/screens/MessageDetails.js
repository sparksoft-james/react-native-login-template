import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Avatar, Input, ListItem, Text } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import Pusher from 'pusher-js/react-native'
import { scale } from 'react-native-size-matters'
import Echo from 'laravel-echo'
import pusherConfig from '../utils/pusher.json'

import Background from '../components/Background'
import { theme } from '../core/theme'
import Header from '../components/Header'
import { request } from '../utils/api'

function MessageDetails({ route, navigation, user }) {
  const { item } = route.params

  const [scrollView, setScrollView] = useState()
  const [channel, setChannel] = useState()
  const [message, setMessage] = useState()
  const [messageText, setMessageText] = useState()
  const [init, setInit] = useState(true)

  useEffect(async () => {
    // await delay(2000)
    await getChannelId()
    const pusher = new Pusher(pusherConfig.key, pusherConfig)
    const chatChannel = pusher.subscribe('channel_' + channel)

    chatChannel.bind('SendMessage', (data) => {
      if (message) {
        const index = message.findIndex((m) => m.id === data.message.id)
        if (index < 0) {
          setMessage((previousMessages) => [...previousMessages, data.message])
        }
      }
    })
  }, [])

  const getMessageData = async () => {
    await delay(5000)
    const URL = `/chat/getMessage?user_id=${user.id}&target_user_id=${item.id}`
    const res = await request.get(URL)
    if (res.data) {
      setMessage(res.data.messages)
    }
  }

  const delay = (ms) => new Promise((res) => setTimeout(res, ms))
  useEffect(async () => {
    await getMessageData()
  }, 5000)

  const getChannelId = async () => {
    const URL = `/chat/getMessage?user_id=${user.id}&target_user_id=${item.id}`
    const res = await request.get(URL)
    if (res.data) {
      setChannel(res.data.channel_id)
      if (init) {
        setMessage(res.data.messages)
        setInit(false)
      }
    }
  }

  const sendMessage = async () => {
    console.log(URL, 'url')
    const URL = `/chat/send?from_id=${user.id}&to_id=${item.id}&message=${messageText}&channel_id=${channel}`
    await request.post(URL)
    await getMessageData()
    setMessageText('')
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
      <ScrollView
        style={styles.mainContainer}
        ref={(ref) => {
          setScrollView(ref)
        }}
        onContentSizeChange={() => scrollView.scrollToEnd({ animated: true })}
      >
        {message &&
          message.map((chat, index) => (
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
    alignSelf: 'flex-start',
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

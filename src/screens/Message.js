import React, { useEffect, useState } from 'react'
import { Avatar, Input, ListItem } from 'react-native-elements'
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { scale } from 'react-native-size-matters'
import { getUser } from '../redux/chat/chat.action'
import Background from '../components/Background'
import { theme } from '../core/theme'
import Header from '../components/Header'

function Message({ navigation, getUserFunc, chat, user }) {
  useEffect(() => {
    getUserFunc(user.id)
  }, [])

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('MessageDetails', { item })}
    >
      <ListItem containerStyle={styles.chatListItem} bottomDivider>
        <Avatar rounded source={{ uri: item.avatar_url }} size={50} />
        <ListItem.Content>
          <ListItem.Title style={styles.chatName}>
            {item.username}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.chatDesc}>
            {item.email}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  )
  return (
    <Background>
      <Header title="Chats" />
      <Input placeholder="Search User Name" style={styles.searchBox} />
      <FlatList
        keyExtractor={keyExtractor}
        data={chat.user && chat.user.length > 0 ? chat.user : []}
        renderItem={renderItem}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  chatListItem: {
    height: 100,
  },
  chatName: {
    fontSize: theme.fontSize.subtitle,
  },
  chatDesc: {
    fontSize: theme.fontSize.paragraph,
  },
  searchBox: {
    marginTop: scale(10),
  },
})

const mapStateToProps = (state) => ({
  chat: state.chat,
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserFunc: getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Message)

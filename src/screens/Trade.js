import React, { useState } from 'react'
import { Avatar, Card, ListItem, Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import { TouchableOpacity, View, StyleSheet, FlatList } from 'react-native'
import Background from '../components/Background'
import Header from '../components/Header'
import { theme } from '../core/theme'

export default function Trade({ navigation }) {
  const [data, setData] = useState([
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 1',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 2',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 3',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 1',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 2',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 3',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 1',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 2',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 3',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 1',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 2',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 3',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 1',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 2',
      desc: 'this is an item',
    },
    {
      avatar:
        'https://i.pinimg.com/originals/4e/b4/f8/4eb4f8a7e04b57e74914fc46e013ac40.jpg',
      title: 'Item 3',
      desc: 'this is an item',
    },
  ])

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem containerStyle={styles.itemListItem} bottomDivider>
        <Avatar source={{ uri: item.avatar }} size={scale(50)} />
        <ListItem.Content>
          <ListItem.Title style={styles.itemName}>{item.title}</ListItem.Title>
          <ListItem.Subtitle style={styles.itemDesc}>
            {item.desc}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  )

  return (
    <Background>
      <View style={styles.requestContainer}>
        <Header
          title="Incoming Request"
          navigation={navigation}
          route="TradeCreate"
          create
        />
        <Card>
          <Card.Title>ALAN WANT TO TRADE WITH U</Card.Title>
          <Card.Divider />
          <Card.Image
            style={{ padding: 0 }}
            source={{
              uri: 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
            }}
          />
          <Text style={{ marginVertical: 10 }}>
            The idea with React Native Elements is more about component
            structure than actual design.
          </Text>
          <View style={styles.actionContainer}>
            <TouchableOpacity style={styles.acceptButton}>
              <Text style={styles.buttonTxt}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.declineButton}>
              <Text style={styles.buttonTxt}>Decline</Text>
            </TouchableOpacity>
          </View>
        </Card>
      </View>
      <Header title="Trade History" />
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  requestContainer: {
    marginBottom: scale(12),
  },
  acceptButton: {
    backgroundColor: theme.colors.success,
    paddingHorizontal: scale(40),
    paddingVertical: scale(5),
    marginHorizontal: scale(5),
  },
  declineButton: {
    backgroundColor: theme.colors.error,
    paddingHorizontal: scale(40),
    paddingVertical: scale(5),
    marginHorizontal: scale(5),
  },
  buttonTxt: {
    color: theme.colors.white,
    fontWeight: 'bold',
  },
})

import React, { useEffect, useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

import { Avatar, ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import { scale } from 'react-native-size-matters'
import { theme } from '../core/theme'
import { BOOKS, IMAGES, MUSICS } from '../utils/constant'
import Background from '../components/Background'
import Header from '../components/Header'

function CollectionDetails({ route, navigation, collection }) {
  const [data, setData] = useState()
  const { title = null } = route.params

  useEffect(() => {
    if (title === BOOKS && collection.book && collection.book.length > 0) {
      setData(collection.book[0].collections)
    }
    if (title === IMAGES && collection.image && collection.image.length > 0) {
      setData(collection.image[0].collections)
    }
    if (title === MUSICS && collection.music && collection.music.length > 0) {
      setData(collection.music[0].collections)
    }
  }, [])

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem containerStyle={styles.itemListItem} bottomDivider>
        <Avatar source={{ uri: item.thumbnail_url }} size={scale(50)} />
        <ListItem.Content>
          <ListItem.Title style={styles.itemName}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.itemDesc}>
            {item.description}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron />
      </ListItem>
    </TouchableOpacity>
  )

  return (
    <Background>
      {title && (
        <Header
          title={title}
          create
          navigation={navigation}
          route="CollectionCreate"
        />
      )}
      <FlatList
        keyExtractor={keyExtractor}
        data={data}
        renderItem={renderItem}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: scale(12),
  },
  itemListItem: {
    height: scale(60),
  },
  itemName: {
    fontSize: theme.fontSize.subtitle,
  },
  itemDesc: {
    fontSize: theme.fontSize.paragraph,
  },
})

const mapStateToProps = (state) => ({
  collection: state.collection,
})

export default connect(mapStateToProps)(CollectionDetails)

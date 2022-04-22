import React, { useEffect, useState } from 'react'
import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'

import { Avatar, ListItem } from 'react-native-elements'
import * as FileSystem from 'expo-file-system'
import { scale } from 'react-native-size-matters'
import { showToast } from '../utils/function'
import { theme } from '../core/theme'
import { BOOKS, IMAGES, MUSICS } from '../utils/constant'
import Background from '../components/Background'
import Header from '../components/Header'

function CollectionDetails({ route, navigation, collection }) {
  const [data, setData] = useState()
  const { title = null } = route.params

  useEffect(() => {
    if (title === BOOKS && collection.book && collection.book.length > 0) {
      setData(collection.book)
    }
    if (title === IMAGES && collection.image && collection.image.length > 0) {
      setData(collection.image)
    }
    if (title === MUSICS && collection.music && collection.music.length > 0) {
      setData(collection.music)
    }
  }, [])

  const downloadFile = (uri) => {
    const path = uri.split('/')
    const file_name = path[path.length - 1]
    const fileUri = FileSystem.documentDirectory + file_name
    FileSystem.downloadAsync(uri, fileUri)
      .then((res) => {
        console.log(res)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => downloadFile(item.download_url)}>
      <ListItem containerStyle={styles.itemListItem} bottomDivider>
        <Avatar source={{ uri: item.thumbnail_url }} size={scale(50)} />
        <ListItem.Content>
          <ListItem.Title style={styles.itemName}>{item.name}</ListItem.Title>
          <ListItem.Subtitle style={styles.itemDesc}>
            {item.description}
          </ListItem.Subtitle>
          {console.log(item)}
          <ListItem.Subtitle style={styles.itemDesc}>
            {item.condition_type}
          </ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron
          iconProps={{ size: scale(15), name: 'file-download' }}
        />
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

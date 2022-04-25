import React, { useEffect, useState } from 'react'
import {
  FlatList,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import * as Linking from 'expo-linking'
import CameraRoll from '@react-native-community/cameraroll'
import { connect } from 'react-redux'

import { Avatar, ListItem } from 'react-native-elements'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import * as Permissions from 'expo-permissions'
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

  const downloadFile = (item) => {
    Linking.openURL(item)

    // FileSystem.downloadAsync(
    //   'http://gahp.net/wp-content/uploads/2017/09/sample.pdf',
    //   FileSystem.documentDirectory + 'small.pdf'
    // )
    //   .then(({ uri }) => {
    //     console.log('Finished downloading to ', uri)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })

    // const item = 'https://i.picsum.photos/id/469/200/200.jpg'
    // console.log(uri, 'rere')
    // const path = uri.split('/')
    // const fileUri = FileSystem.documentDirectory + path[path.length - 1]
    // console.log(path)
    // FileSystem.downloadAsync(item, fileUri)
    //   .then((res) => {
    //     console.log(res, 'response')
    //     saveFile(res.uri)
    //   })
    //   .catch((error) => {
    //     console.error(error)
    //   })
  }

  const saveFile = async (fileUri) => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]).then(async () => {
        const asset = await MediaLibrary.createAssetAsync(fileUri)
        await MediaLibrary.createAlbumAsync('Download', asset, false)
      })
    }
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

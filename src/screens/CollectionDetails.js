import React, { useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import * as Linking from 'expo-linking'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Avatar, ListItem } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import { theme } from '../core/theme'
import { getCollection } from '../redux/collection/collection.action'
import {
  BOOKS,
  IMAGES,
  MUSICS,
  FILES,
  BOOK_TYPE,
  MUSIC_TYPE,
  IMAGE_TYPE,
  FILE_TYPE,
} from '../utils/constant'
import Background from '../components/Background'
import Header from '../components/Header'
import { request } from '../utils/api'

function CollectionDetails({
  route,
  navigation,
  collection,
  getCollectionFunc,
  user,
}) {
  const [data, setData] = useState()
  const { title = null } = route.params
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }, [])

  useEffect(() => {
    getData()
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      getData()
    }, [])
  )

  const getData = async () => {
    let res = {}
    if (title === BOOKS) {
      res = await getCollectionFunc(user.id, BOOK_TYPE)
      setData(res.data)
    }
    if (title === IMAGES) {
      res = await getCollectionFunc(user.id, IMAGE_TYPE)
      setData(res.data)
    }
    if (title === MUSICS) {
      res = await getCollectionFunc(user.id, MUSIC_TYPE)
      setData(res.data)
    }
    if (title === FILES) {
      res = await getCollectionFunc(user.id, FILE_TYPE)
      setData(res.data)
    }
  }

  const deleteItem = async (item) => {
    const res = await request.postFormData('/collection/delete', {
      collection_id: item.id,
    })
    if (res && res.responseCode === 0) {
      Alert.alert('Action Success', res.responseMessage, [
        {
          text: 'OK',
        },
      ])
      getData()
    }
  }

  const showConfirmDialog = (item) => {
    return Alert.alert(
      'Remove Item',
      'Are you sure you want to remove this item?',
      [
        // The "Yes" button
        {
          text: 'Yes',
          onPress: () => {
            deleteItem(item)
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: 'No',
        },
      ]
    )
  }
  const downloadFile = (item) => {
    Linking.openURL(item)
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    // <TouchableOpacity>
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
        onPress={() => downloadFile(item.download_url)}
        iconProps={{ size: scale(20), name: 'file-download' }}
      />
      <ListItem.Chevron
        onPress={() => showConfirmDialog(item)}
        iconProps={{ size: scale(20), name: 'delete' }}
      />
    </ListItem>
    // </TouchableOpacity>
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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCollectionFunc: getCollection }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CollectionDetails)

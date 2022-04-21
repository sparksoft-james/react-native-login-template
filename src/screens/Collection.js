import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'
import { bindActionCreators } from 'redux'
import {
  BOOKS,
  IMAGES,
  MUSICS,
  BOOK_TYPE,
  MUSIC_TYPE,
  IMAGE_TYPE,
} from '../utils/constant'
import Background from '../components/Background'
import ColelctionItem from '../components/collection/CollectionItem'
import { getCollection } from '../redux/collection/collection.action'
import { theme } from '../core/theme'
// import { ScrollView } from 'react-native-gesture-handler'

function Collection(props) {
  const { navigation, collection, user, getCollectionFunc } = props
  useEffect(() => {
    getCollectionFunc(user.id, BOOK_TYPE)
    getCollectionFunc(user.id, MUSIC_TYPE)
    getCollectionFunc(user.id, IMAGE_TYPE)
  }, [])

  return (
    <ScrollView style={styles.container}>
      <ColelctionItem
        title={BOOKS}
        data={
          collection.book && collection.book.length > 0
            ? collection.book.slice(0, 5)
            : []
        }
        navigation={navigation}
        route="CollectionDetails"
        view
      />
      <ColelctionItem
        title={IMAGES}
        data={
          collection.image && collection.image.length > 0
            ? collection.image.slice(0, 5)
            : []
        }
        navigation={navigation}
        route="CollectionDetails"
        view
      />
      <ColelctionItem
        title={MUSICS}
        data={
          collection.music && collection.music.length > 0
            ? collection.music.slice(0, 5)
            : []
        }
        navigation={navigation}
        route="CollectionDetails"
        view
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: theme.colors.white,
  },
})

const mapStateToProps = (state) => ({
  collection: state.collection,
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getCollectionFunc: getCollection }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Collection)

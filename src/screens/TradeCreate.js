import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import { getUser } from '../redux/chat/chat.action'
import Background from '../components/Background'
import { showToast } from '../utils/function'
import Button from '../components/Button'
import Header from '../components/Header'
import { theme } from '../core/theme'
import { request } from '../utils/api'
import ColelctionItem from '../components/collection/CollectionItem'

function TradeCreate({ navigation, getUserFunc, chat, user, route }) {
  const [ownCollection, setOwnCollection] = useState()
  const [othersCollection, setOthersCollection] = useState()
  const [reqCollectionId, setReqCollectionId] = useState()
  const [targetCollectionId, setTargetCollectionId] = useState()

  const { item } = route.params
  useEffect(() => {
    getUserFunc(user.id)
    getOwnCollection()
    if (chat.user.length > 0) {
      getOthersCollection(item.id)
    }
  }, [])

  const getOwnCollection = async () => {
    const URL = `/users/collection/${user.id}`
    const res = await request.get(URL)
    if (res.data) {
      setOwnCollection(res.data)
    }
  }

  const getOthersCollection = async (val) => {
    const URL = `/users/collection/${val}`
    const res = await request.get(URL)
    if (res.data) {
      setOthersCollection(res.data)
    }
  }

  const trade = async () => {
    const payload = {
      request_collection_id: reqCollectionId,
      target_collection_id: targetCollectionId,
    }
    if (!reqCollectionId || !targetCollectionId) {
      showToast('Item not selected')
    } else {
      const res = await request.postFormData('/trade/store', payload)
      if (res && res.responseCode === 0) {
        Alert.alert('Create Success', res.responseMessage, [
          {
            text: 'OK',
          },
        ])
      }
    }
  }

  return (
    <Background>
      <Header title="Create Trade" />
      <Text style={styles.pickerLabel}>Give</Text>
      <ColelctionItem
        data={ownCollection && ownCollection.length > 0 ? ownCollection : []}
        setItem={setReqCollectionId}
        press
      />
      <Text style={styles.pickerLabel}>Request</Text>
      <ColelctionItem
        data={
          othersCollection && othersCollection.length > 0
            ? othersCollection
            : []
        }
        press
        setItem={setTargetCollectionId}
      />

      <Button mode="contained" onPress={() => trade()}>
        Request Trade
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  pickerContainer: {
    marginVertical: scale(8),
  },
  pickerLabel: {
    fontSize: theme.fontSize.secondaryTitle,
    fontWeight: 'bold',
    marginVertical: scale(12),
    marginBottom: scale(4),
  },
  pickerItem: {
    fontSize: theme.fontSize.subtitle,
  },
})

const mapStateToProps = (state) => ({
  chat: state.chat,
  user: state.user,
  collection: state.collection,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ getUserFunc: getUser }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TradeCreate)

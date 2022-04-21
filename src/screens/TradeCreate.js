import React, { useEffect, useState } from 'react'
import { View, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Picker } from '@react-native-picker/picker'
import { Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import { getUser } from '../redux/chat/chat.action'
import Background from '../components/Background'
import Button from '../components/Button'
import Header from '../components/Header'
import { theme } from '../core/theme'
import { request } from '../utils/api'

function TradeCreate({ navigation, getUserFunc, chat, user }) {
  const [ownCollection, setOwnCollection] = useState()
  const [othersCollection, setOthersCollection] = useState()
  const [reqCollectionId, setReqCollectionId] = useState()
  const [targetCollectionId, setTargetCollectionId] = useState()

  useEffect(() => {
    getUserFunc(user.id)
    getOwnCollection()
    if (chat.user.length > 0) {
      getOthersCollection(chat.user[0].id)
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

  return (
    <Background>
      <Header title="Create Trade" />
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Trade to</Text>
        <Picker
          style={styles.pickerItem}
          onValueChange={(val) => getOthersCollection(val)}
        >
          {chat.user &&
            chat.user.length > 0 &&
            chat.user.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Give</Text>
        <Picker style={styles.pickerItem}>
          {ownCollection &&
            ownCollection.length > 0 &&
            ownCollection.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Request</Text>
        <Picker style={styles.pickerItem}>
          {othersCollection &&
            othersCollection.length > 0 &&
            othersCollection.map((item) => (
              <Picker.Item key={item.id} label={item.name} value={item.id} />
            ))}
        </Picker>
      </View>
      <Button mode="contained">Submit</Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  pickerContainer: {
    marginVertical: scale(8),
  },
  pickerLabel: {
    fontSize: theme.fontSize.subtitle,
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

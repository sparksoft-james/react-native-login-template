import React, { useEffect, useState } from 'react'
import { Avatar, Card, ListItem, Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import {
  TouchableOpacity,
  View,
  StyleSheet,
  FlatList,
  ScrollView,
  Alert,
  RefreshControl,
} from 'react-native'
import { connect } from 'react-redux'
import Background from '../components/Background'
import Header from '../components/Header'
import { theme } from '../core/theme'
import { request } from '../utils/api'

function Trade({ navigation, user }) {
  const [tradeReq, setTradeReq] = useState([])
  const [tradeHistory, setTradeHistory] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true)
    await getData()
    setRefreshing(false)
  }, [])

  useEffect(async () => {
    await getData()
  }, [])

  const getData = async () => {
    const URL = `/trade/user/${user.id}?status=pending`
    const res = await request.get(URL)
    if (res.data) {
      setTradeReq(res.data)
    }
    const resHis = await request.get(`/trade/user/${user.id}`)
    if (resHis.data) {
      setTradeHistory(resHis.data)
    }
  }

  const submit = async (status, id) => {
    const URL = `/trade/update?status=${status}&trade_id=${id}`
    const res = await request.post(URL)
    if (res && res.responseCode === 0) {
      Alert.alert('Action Success', res.responseMessage, [
        {
          text: 'OK',
        },
      ])
    }
    await getData()
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <TouchableOpacity>
      <ListItem containerStyle={styles.itemListItem} bottomDivider>
        {/* <Avatar source={{ uri: item.avatar }} size={scale(50)} /> */}
        <ListItem.Content>
          <ListItem.Title style={styles.itemName}>
            {`${item.request_user.name} exchange with ${item.target_user.name}`}
          </ListItem.Title>
          <ListItem.Subtitle style={styles.itemDesc}>
            Status : {item.status}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.itemDesc}>
            Request Item : {item.target_collection.name}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.itemDesc}>
            Exchange Item : {item.requestor_collection.name}
          </ListItem.Subtitle>
          <ListItem.Subtitle style={styles.itemDesc}>
            Date time : {item.created_at}
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
          // navigation={navigation}
          // route="TradeCreate"
          // create
        />
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          style={styles.requestContainerView}
        >
          {tradeReq && tradeReq.length > 0 ? (
            tradeReq.map((item, index) => (
              <Card>
                <Card.Title>Trade Request</Card.Title>
                <Card.Divider />
                <View style={styles.imageItemMainContainer}>
                  <View>
                    <Text style={styles.imageItemContainerlabel}>Give</Text>
                    <Card.Image
                      style={styles.cardImage}
                      source={{
                        uri: item.target_collection.thumbnail_url,
                      }}
                    />
                    <Text style={styles.imageItemContainerTitle}>
                      {item.target_collection.name}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.imageItemContainerlabel}>Exchange</Text>
                    <Card.Image
                      style={styles.cardImage}
                      source={{
                        uri: item.requestor_collection.thumbnail_url,
                      }}
                    />
                    <Text style={styles.imageItemContainerTitle}>
                      {item.requestor_collection.name}
                    </Text>
                  </View>
                </View>
                <View style={styles.actionContainer}>
                  <TouchableOpacity
                    style={styles.acceptButton}
                    onPress={() => submit('approved', item.id)}
                  >
                    <Text style={styles.buttonTxt}>Accept</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.declineButton}
                    onPress={() => submit('rejected', item.id)}
                  >
                    <Text style={styles.buttonTxt}>Decline</Text>
                  </TouchableOpacity>
                </View>
              </Card>
            ))
          ) : (
            <View style={styles.noDataContainer}>
              <Text style={styles.label}>No Data Available</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <Header title="Trade History" />
      <FlatList
        keyExtractor={keyExtractor}
        data={tradeHistory}
        renderItem={renderItem}
      />
    </Background>
  )
}

const styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: scale(10),
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
  requestContainerView: {
    height: scale(180),
  },
  cardImage: {
    padding: 0,
    resizeMode: 'contain',
  },
  imageItem: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  imageItemMainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageItemContainerlabel: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: 'bold',
  },
  imageItemContainerTitle: {
    fontSize: theme.fontSize.paragraph,
  },
  itemName: {
    fontSize: theme.fontSize.subtitle,
  },
  itemDesc: {
    fontSize: theme.fontSize.paragraph,
  },
  // noDataContainer: {
  //   // flex: 1,
  //   // flexDirection: 'row',
  //   // justifyContent: 'center',
  //   // alignItems: 'center',
  // },
  label: {
    fontSize: theme.fontSize.paragraph,
    marginVertical: scale(10),
  },
})

const mapStateToProps = (state) => ({
  user: state.user,
})

export default connect(mapStateToProps)(Trade)

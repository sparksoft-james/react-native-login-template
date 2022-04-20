import React from 'react'
import { StyleSheet, ScrollView, View } from 'react-native'
import { Card, Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import { theme } from '../../core/theme'
import Header from '../Header'

export default function ColelctionItem(props) {
  const { data } = props
  return (
    <>
      <Header {...props} />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.collectionContainer}
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <Card key={index} containerStyle={styles.cardContainer}>
              <Card.Image
                style={styles.cardImage}
                source={{
                  uri: item.thumbnail_url,
                }}
              />
              <Text style={({ marginBottom: 10 }, styles.cardTitle)}>
                {item.name}
              </Text>
            </Card>
          ))
        ) : (
          <View style={styles.noDataContainer}>
            <Text style={styles.label}>No Data Available</Text>
          </View>
        )}
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: scale(120),
    height: scale(140),
    // padding: 0,
    marginLeft: 0,
    borderRadius: 10,
  },
  cardImage: {
    marginBottom: 20,
    resizeMode: 'contain',
  },
  cardTitle: {
    fontSize: theme.fontSize.subtitle,
    fontWeight: 'bold',
    marginVertical: scale(10),
  },
  collectionContainer: {
    width: '100%',
    paddingBottom: 30,
  },
  noDataContainer: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: theme.fontSize.paragraph,
    marginVertical: scale(10),
  },
})

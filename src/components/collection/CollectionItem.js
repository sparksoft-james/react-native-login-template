import React, { useState } from 'react'
import { StyleSheet, ScrollView, View, TouchableOpacity } from 'react-native'
import { Card, Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import { theme } from '../../core/theme'
import Header from '../Header'

export default function ColelctionItem(props) {
  const { data, header = false, setItem = null, press = false } = props
  const [selectedItem, setSelectedItem] = useState()

  return (
    <>
      {header && <Header {...props} />}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.collectionContainer}
      >
        {data.length > 0 ? (
          data.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (press) {
                  setItem(item.id)
                  setSelectedItem(index)
                }
              }}
            >
              <Card
                containerStyle={
                  selectedItem === index
                    ? [styles.selectedCardContainer]
                    : [styles.cardContainer]
                }
              >
                <Card.Image
                  style={styles.cardImage}
                  source={{
                    uri: item.thumbnail_url,
                  }}
                />
                <Text style={styles.cardTitle}>{item.name}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </Card>
            </TouchableOpacity>
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
    marginLeft: 0,
    borderRadius: 10,
  },
  selectedCardContainer: {
    width: scale(120),
    height: scale(140),
    marginLeft: 0,
    borderRadius: 10,
    borderColor: theme.colors.primary,
    borderWidth: scale(2),
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
  cardDescription: {
    fontSize: theme.fontSize.paragraph,
    // fontWeight: 'bold',
    marginVertical: scale(4),
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

import React, { useState } from 'react'
// import Permissions from 'react-native-permissions'
import {
  Alert,
  Platform,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import * as ImagePicker from 'expo-image-picker'
import * as DocumentPicker from 'expo-document-picker'
// import DocumentPicker from 'react-native-document-picker'
import { Button, Input, Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import { theme } from '../core/theme'
import { BOOKS, IMAGES, MUSICS } from '../utils/constant'
import Background from '../components/Background'
import Header from '../components/Header'

export default function CollectionCreate({ route, navigation }) {
  const { title = null } = route.params
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [file, setFile] = useState()

  const uploadItem = (type) => {
    if (title === BOOKS || title === MUSICS) {
      // openDocument()
    } else {
      openGallery(type)
    }
  }

  async function openGallery(type) {
    const response = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (response) {
      if (response.uri) {
        console.log(response)
        if (type === 'thumb') {
          setThumbnail({
            type: response.type,
            uri: response.uri,
          })
        }
        if (type === 'file') {
          setFile({
            type: response.type,
            uri: response.uri,
          })
        }
      }
    }
  }

  const permission = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]).then(async (res) => {
        console.log(res)
        // if (
        //   res['android.permission.READ_EXTERNAL_STORAGE'] === 'granted' &&
        //   res['android.permission.WRITE_EXTERNAL_STORAGE'] === 'granted'
        // ) {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
          multiple: false,
          type: '*/*',
        })
        console.log(result)
        setFile({
          type: result.type,
          uri: result.uri,
        })
        // }
      })
    }
  }
  const pickDocument = async () => {
    // const res = await DocumentPicker.pick({
    //   type: [DocumentPicker.types.pdf],
    // })
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: ['*/*'],
    })
    console.log(result)
    setFile({
      type: result.type,
      uri: result.uri,
    })
  }

  const component1 = () => <Text>New</Text>
  const component2 = () => <Text>Used</Text>

  const buttons = [{ element: component1 }, { element: component2 }]

  return (
    <Background>
      <Header title={`Create ${title}`} />
      <View style={styles.formContainer}>
        <Input placeholder="Name" onChangeText={(value) => setName(value)} />
        <Input
          placeholder="Description"
          onChangeText={(value) => setDescription(value)}
        />
        {/* <Input
          placeholder="File Type"
          // onChangeText={(value) => this.setState({ comment: value })}
        /> */}
        {/* <Input
          placeholder="Upload File"
          value={file && file.uri ? file.uri : ''}
          onPress={() => openGallery('file')}
          // onChangeText={(value) => this.setState({ comment: value })}
        /> */}

        <TouchableOpacity
          style={[styles.uploadBox, file && styles.greenBorder]}
          onPress={() => permission()}
        >
          <MaterialIcons
            name={file ? 'cloud-done' : 'cloud-upload'}
            size={50}
            style={styles.uploadIcon}
            color={file ? theme.colors.success : theme.colors.primary}
          />
          <Text style={styles.uploadTitle}>
            {file && file.uri && file.uri.length > 0
              ? `...${file.uri.substring(0, 50)}`
              : 'Upload file'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.uploadBox, thumbnail && styles.greenBorder]}
          onPress={() => openGallery('thumb')}
        >
          <MaterialIcons
            name={thumbnail ? 'cloud-done' : 'cloud-upload'}
            size={50}
            style={styles.uploadIcon}
            color={thumbnail ? theme.colors.success : theme.colors.primary}
          />
          <Text style={styles.uploadTitle}>
            {thumbnail && thumbnail.uri && thumbnail.uri.length > 0
              ? `...${thumbnail.uri.substring(0, 50)}`
              : 'Upload thumbnail'}
          </Text>
        </TouchableOpacity>
        {/* 
        <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex={selectedIndex}
          buttons={buttons}
          containerStyle={{ height: 100 }}
        /> */}

        <Button
          title="Submit"
          buttonStyle={{
            backgroundColor: theme.colors.text,
            borderRadius: 5,
          }}
          containerStyle={{
            width: '100%',
            height: 50,
            marginVertical: scale(5),
          }}
          titleStyle={{
            color: 'white',
            fontWeight: 'bold',
            marginHorizontal: scale(10),
          }}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: scale(10),
  },
  uploadBox: {
    height: 175,
    width: 275,
    marginVertical: scale(5),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    padding: 10,
    borderWidth: 2,
    borderColor: theme.colors.grey300,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: theme.colors.primary,
    textAlign: 'center',
  },
  greenBorder: {
    borderColor: theme.colors.green300,
  },
})

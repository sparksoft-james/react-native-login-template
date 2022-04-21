import React, { useEffect, useState } from 'react'
// import Permissions from 'react-native-permissions'
import {
  Platform,
  PermissionsAndroid,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { scale } from 'react-native-size-matters'
import { Button, ButtonGroup, Input, Text } from 'react-native-elements'
import * as DocumentPicker from 'expo-document-picker'
import { postCollection } from '../redux/collection/collection.action'
// import DocumentPicker from 'react-native-document-picker'
import { theme } from '../core/theme'
import {
  BOOKS,
  IMAGES,
  MUSICS,
  BOOK_TYPE,
  IMAGE_TYPE,
  MUSIC_TYPE,
} from '../utils/constant'
import Background from '../components/Background'
import Header from '../components/Header'

function CollectionCreate({ route, navigation, user, postCollectionFunc }) {
  const { title = null } = route.params
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [thumbnail, setThumbnail] = useState()
  const [file, setFile] = useState()
  const [collectionType, setCollectionType] = useState(1)
  const [collectionTypeId, setCollectionTypeId] = useState()

  const assignType = () => {
    if (title === BOOKS) {
      setCollectionTypeId(BOOK_TYPE)
    }
    if (title === IMAGES) {
      setCollectionTypeId(IMAGE_TYPE)
    }
    if (title === MUSICS) {
      setCollectionTypeId(MUSIC_TYPE)
    }
  }
  useEffect(() => {
    assignType()
  }, [])

  const submit = () => {
    let condition_type = 'used'
    if (collectionType === 1) {
      condition_type = 'used'
    } else if (collectionType === 0) {
      condition_type = 'new'
    }
    const payload = {
      collection_type_id: collectionTypeId,
      collector_id: user.id,
      name,
      description,
      condition_type,
      thumbnail,
      file,
    }
    postCollectionFunc(payload)
  }

  async function openGallery(type) {
    const result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
      multiple: false,
      type: 'image/*',
    })
    if (result) {
      processFile(result, setThumbnail)
    }
  }

  const pickDoc = () => {
    if (Platform.OS === 'android') {
      PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ]).then(async (res) => {
        const result = await DocumentPicker.getDocumentAsync({
          copyToCacheDirectory: true,
          multiple: false,
          type: '*/*',
        })
        if (result) {
          console.log(result)
          processFile(result, setFile)
        }
      })
    }
  }

  const processFile = async (result, setItem) => {
    setItem({ uri: result.uri, name: result.name, type: result.mimeType })
  }

  return (
    <Background>
      <Header title={`Create ${title}`} />
      <View style={styles.formContainer}>
        <Input placeholder="Name" onChangeText={(value) => setName(value)} />
        <Input
          placeholder="Description"
          onChangeText={(value) => setDescription(value)}
        />
        <TouchableOpacity
          style={[styles.uploadBox, file && styles.greenBorder]}
          onPress={() => pickDoc()}
        >
          <MaterialIcons
            name={file ? 'cloud-done' : 'cloud-upload'}
            size={50}
            style={styles.uploadIcon}
            color={file ? theme.colors.success : theme.colors.primary}
          />
          <Text style={styles.uploadTitle}>
            {file && file.name && file.name.length > 0
              ? `${file.name.substring(0, 50)}`
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
            {thumbnail && thumbnail.name && thumbnail.name.length > 0
              ? `${thumbnail.name.substring(0, 50)}`
              : 'Upload thumbnail'}
          </Text>
        </TouchableOpacity>
        <Text>{}</Text>
        <ButtonGroup
          // onPress={(val) => updateIndex(val)}
          onPress={(value) => {
            setCollectionType(value)
          }}
          buttons={['Used', 'New']}
          selectedIndex={collectionType}
          selectedButtonStyle={{ backgroundColor: theme.colors.primary }}
          containerStyle={{ height: 50 }}
        />

        <Button
          title="Submit"
          onPress={submit}
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
    height: 120,
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

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ postCollectionFunc: postCollection }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(CollectionCreate)

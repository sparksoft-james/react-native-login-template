import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet'
import { scale, moderateScale } from 'react-native-size-matters'
import { txtGrey } from 'utils/colours'
import style from './file_picker_sheet.style'

const FilePickerSheet = (props) => {
  const { openFile, pickerSheet } = props

  const _renderContentImagePicker = () => {
    return (
      <View style={style.image_picker_box}>
        <MyText
          medium
          style={{
            fontSize: moderateScale(13),
            color: txtGrey,
            marginBottom: scale(20),
          }}
        >
          {localized.select_cert}
        </MyText>

        <View style={style.divider} />
        <TouchableOpacity onPress={openFile}>
          <MyText bold style={{ fontSize: moderateScale(18) }}>
            {localized.choose_from_pdf}
          </MyText>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <BottomSheet
      ref={pickerSheet}
      snapPoints={[scale(-50), scale(160)]}
      renderContent={_renderContentImagePicker}
      initialSnap={1}
      enabledGestureInteraction={false}
    />
  )
}

export default React.memo(FilePickerSheet)

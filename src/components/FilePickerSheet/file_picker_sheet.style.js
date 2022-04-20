import {ScaledSheet} from 'react-native-size-matters';
import {white, txtGrey} from 'utils/colours';

export default ScaledSheet.create({
  image_picker_box: {
    backgroundColor: white,
    height: '100%',
    borderTopLeftRadius: '15@s',
    borderTopRightRadius: '15@s',
    alignItems: 'center',
    paddingTop: '15@s',
  },
  divider: {
    height: '1@s',
    width: '80%',
    backgroundColor: txtGrey,
    marginVertical: '10@s',
  },
});

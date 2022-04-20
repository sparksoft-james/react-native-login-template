import React from 'react'
import { StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Text } from 'react-native-elements'
import { scale } from 'react-native-size-matters'
import Background from '../components/LoginBackground'
import Header from '../components/Header'
import Button from '../components/Button'
import { logout } from '../redux/auth/login.action'
import { theme } from '../core/theme'

function Profile(props) {
  const { user, navigation, logoutFunc } = props

  const onLogoutPressed = () => {
    logoutFunc(navigation)
  }
  return (
    <Background>
      {console.log(user)}
      <Header title={user.name} />
      <Text style={styles.label}>Email: {user.email}</Text>
      <Text style={styles.label}>Username: {user.username}</Text>
      <Button mode="outlined" onPress={() => onLogoutPressed()}>
        Logout
      </Button>
    </Background>
  )
}

const styles = StyleSheet.create({
  label: {
    fontSize: theme.fontSize.paragraph,
    marginVertical: scale(10),
  },
})

const mapStateToProps = (state) => ({
  user: state.user,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ logoutFunc: logout }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

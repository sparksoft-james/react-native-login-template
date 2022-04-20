import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AuthStack from './AuthStack'
import BottomTabNav from './BottomTabNav'

function Entry(props) {
  const { api_token } = props

  if (!api_token) {
    return <AuthStack />
  }

  return <BottomTabNav />
}

const mapStateToProps = (state) => ({
  ...state.user,
})

export default connect(mapStateToProps)(Entry)

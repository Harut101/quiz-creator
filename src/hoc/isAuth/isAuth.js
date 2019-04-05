import React from 'react'
import { connect } from 'react-redux'
import Forbidden from '../../pages/Forbidden-Pages/forbidden'

export default function requireAuthentication(Component) {

  class AuthenticatedComponent extends React.Component {
    render() {
      return (
        <>
          {this.props.token ? <Component/>  : <Forbidden/> }
        </>
      )
    }
  }

  const mapStateToProps = (state) => {
    return {
       token: state.authReducer.token
    }
  }

  return connect(mapStateToProps, null)(AuthenticatedComponent)
}
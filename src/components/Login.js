import React, { Component } from 'react'
import { connect } from 'react-redux'
import User from './User'

class Login extends Component {
  render() {
    const { uids } = this.props
    return (
      <div className="login-page">
        <div className="login-form">
          <h1 className="login-header">Who are you?</h1>
          <ul>
            {uids.map((uid) => (
              <li key={uid}>
                <User uid={uid}/>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
function mapStateToProps({ users }) {
  return {
    uids: Object.keys(users)
  }
}
export default connect(mapStateToProps)(Login)
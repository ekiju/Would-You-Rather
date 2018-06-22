import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { handleLoginUser } from '../actions/authedUser'

class User extends Component {
  state = {
    toHome: false
  }
  handleLogin = (e) => {
    e.preventDefault()
    const { user, uid, dispatch } = this.props
    dispatch(handleLoginUser(uid))
    this.setState({ toHome: true })
  }
  render() {
    const { user } = this.props
    const { toHome } = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="login-avatar">
        <img className="avatar-small" onClick={this.handleLogin} src={user.avatarURL} />
        <p className="username">{user.name}</p>
        <p className="confirm">{user.nickname}</p>
      </div>
    )
  }
}
function mapStateToProps({ users, authedUser }, { uid }) {
  const user = users[uid]
  return {
    users,
    user,
    uid
  }
}
export default connect(mapStateToProps)(User)
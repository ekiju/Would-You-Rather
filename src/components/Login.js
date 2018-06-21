import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Dashboard from './Dashboard'
import { handleLoginUser } from '../actions/authedUser'

class Login extends Component {
  state = {
    user: '',
    toHome: false
  }
  handleChange = (e) => {
    const user = e.target.value
    this.setState(() => ({user}))
  }
  handleLogin = (e) => {
    const { user } = this.state
    const { dispatch } = this.props
    dispatch(handleLoginUser(user))

    this.setState(() => ({
      user: '',
      toHome: user!=='' 
    }))
  }
  render() {
    const { users } = this.props
    console.log('users ', users)
    const { toHome } = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div>
        <h1>Login</h1>
        <div className="login-form">
          <select onChange={this.handleChange} defaultValue=''>
            <option disabled value=''>Select User...</option>
            {Object.keys(users).map((user) => (
              <option key={users[user].id} value={users[user].id}>
                {users[user].name}
              </option>
            ))}
          </select>
          <button onClick={this.handleLogin}>Login</button>
        </div>
      </div>
    )
  }
}
function mapStateToProps({ users }) {
  return {
    users: users
  }
}
export default connect(mapStateToProps)(Login)
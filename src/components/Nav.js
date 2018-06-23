import React, { Component } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { handleLogoutUser } from '../actions/authedUser'

class Nav extends Component {
  handleLogout = (e) => {
    const { dispatch } = this.props
    e.preventDefault()
    dispatch(handleLogoutUser())
  }
  render() {
    console.log('nav ', this.props)
    const { authedUser, user } = this.props
    return (
      <div className="navbar" id="topNav">
        <span className="logo">Would You Rather</span>
        <div className="navlinks">
          <NavLink className="navlink-item" to='/' exact>
            Home
          </NavLink>
          <NavLink className="navlink-item" to='/add' exact>
            New Question
          </NavLink>
          <NavLink className="navlink-item" to='/leaderboard' exact>
            Leaderboard
          </NavLink>

          { authedUser && (
            <div className="nav-logged-in">
              <p>Welcome, {authedUser}</p>
              <img alt={user.name} className="nav-avatar" src={user.avatarURL} />
            </div>
          )}
          <button onClick={this.handleLogout}>
            Logout
          </button>
        </div>
      </div>
    )
  }
}
function mapStateToProps({ authedUser, users }) {
  const user = users[authedUser]
  return {
    authedUser,
    user
  }
}
export default connect(mapStateToProps)(Nav)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import LeaderboardItem from './LeaderboardItem'
import { Link } from 'react-router-dom'

class Leaderboard extends Component {
  render() {
    const { users } = this.props
    return (
      <div className="leaderboard">
        <h1>Leaderboard</h1>
        <ul>
          {users.map((user) => (
            <li>
              <LeaderboardItem key={user.id} id={user.id} />
            </li>
          ))}
        </ul>
        <Link to='/'>
        <i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
      </div>
    )
  }
}
function mapStateToProps({ users }) {
  const usersArray = Object.values(users)
  return {
    users: usersArray.sort((a,b) => (
      (Object.keys(b.answers).length + b.questions.length) -
      (Object.keys(a.answers).length + a.questions.length)
    )),
  }
}
export default connect(mapStateToProps)(Leaderboard)
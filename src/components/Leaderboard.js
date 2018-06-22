import React, { Component } from 'react'
import { connect } from 'react-redux'
import LeaderboardItem from './LeaderboardItem'

class Leaderboard extends Component {
  render() {
    const { users } = this.props
    console.log('this is props from leaderboard (users) ', users)
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
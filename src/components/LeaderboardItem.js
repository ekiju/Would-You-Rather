import React, { Component } from 'react'
import {connect} from 'react-redux'

class LeaderboardItem extends Component {
  render() {
    const {user} = this.props
    const answers = Object.values(user.answers)
    return (
      <div className="leaderboard-card">
        <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className='leaderboard-avatar' />
        <div className="leaderboard-user">
          <h2>{user.name}</h2>
          <p>Questions Answered: {answers.length}</p>
          <p>Questions Submitted:{user.questions.length}</p>
          <h3>Score: {answers.length+user.questions.length}</h3>
        </div>
      </div>
    )
  }
}
function mapStateToProps({ users }, { id }) {
  const user = users[id]
  return {
    users,
    user,
    id
  }
}
export default connect(mapStateToProps)(LeaderboardItem)
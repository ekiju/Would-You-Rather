import React, { Component } from 'react'
import {connect} from 'react-redux'

class LeaderboardItem extends Component {
  render() {
    const {user} = this.props
    const answers = Object.values(user.answers)
    console.log('props from leaderboarditem ', this.props)
    return (
      <div className="leaderboard-card">
        Name: {user.name}
        <img src={user.avatarURL} alt={`Avatar of ${user.name}`} width={100} className='avatar' />
        Questions Answered: {answers.length}
        Questions Submitted:{user.questions.length}
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
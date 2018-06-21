import React, { Component } from 'react'
import { connect } from 'react-redux'
import LeaderboardItem from './LeaderboardItem'

class Leaderboard extends Component {
  render() {
    console.log('this is props from leaderboard ', this.props)
    return (
      <div>
        <h1>Leaderboard</h1>
        <LeaderboardItem />
      </div>
    )
  }
}
function mapStateToProps({ users }) {
  return {
    users
  }
}
export default connect(mapStateToProps)(Leaderboard)
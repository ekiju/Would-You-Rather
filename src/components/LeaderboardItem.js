import React, { Component } from 'react'
import {connect} from 'react-redux'

class LeaderboardItem extends Component {
  render() {
    return (
      <div>
        each user will be its own div/card
      </div>
    )
  }
}
export default connect()(LeaderboardItem)
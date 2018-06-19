import React, { Component } from 'react'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        Dashboard
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }) {
  const currentUser = users[authedUser]
  return {
    authedUser,
    answeredQuestions: currentUser.questions,
    unansweredQuestions: Object.keys(questions).filter((question) => question.id !== authedUser),
    users
    // answeredQuestions: users.authedUser.questions,
    // unansweredQuestions: !questions.includes(currentUser.questions)
  }
}
export default connect(mapStateToProps)(Dashboard)
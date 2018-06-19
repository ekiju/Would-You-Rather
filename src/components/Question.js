import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'
import Answered from './Answered'
import Unanswered from './Unanswered'
import Details from './Details'

class Question extends Component {
  questionStatus = () => {
    const { status } = this.props
    const { id } = this.props
    switch(status) {
      case 'answered':
        return (
          <Answered id={id} status={status} />
        )
      case 'unanswered':
        return (
          <Unanswered id={id} status={status} />
        )
      default :
        return (
          <Answered id={id} status={status} />
        ) 
    }
  }

  render() {
    const { question } = this.props
    if (question == null) {
      return <p>This question doesn't exist!</p> 
      // or take to 404 page
    }
    

    return (
      <div>
        {this.questionStatus()}
      </div>
    )
  }
}
function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id]
  return {
    authedUser,
    question: question ? formatQuestion(question, users[question.author], authedUser) : null,
    author: users[question.author]
  }
}
export default connect(mapStateToProps)(Question)
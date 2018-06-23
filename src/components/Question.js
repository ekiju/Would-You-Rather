import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatQuestion } from '../utils/helpers'
import Answered from './Answered'
import Unanswered from './Unanswered'

class Question extends Component {
  questionStatus = () => {
    const { status } = this.props
    const { id } = this.props
    switch(status) {
      case 'answered':
        return (
          <Answered id={id} />
        )
      case 'unanswered':
        return (
          <Unanswered id={id} />
        )
      default :
        return (
          <Unanswered id={id} />
        ) 
    }
  }

  render() {
    const { question } = this.props
    if (question == null) {
      return <p>This question doesn't exist!</p> 
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
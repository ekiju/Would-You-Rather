import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'

class Unanswered extends Component {
  render() {
    const { question } = this.props
    const { id, status } = this.props
    const { author, timestamp, optionOne, optionTwo } = question
    const { avatarURL } = this.props.author
    return (
      <div>
        <div className='question-card'>
          Posted by: <img
            src={avatarURL}
            alt={`Avatar of ${author}`}
            width={100}
            className='avatar'
          />
          <div>
            Would you rather {optionOne.text} or {optionTwo.text}?
          </div>
          <Link to={`/question/${id}`} className="question">
            Vote Now
          </Link>
        </div>
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
export default connect(mapStateToProps)(Unanswered)
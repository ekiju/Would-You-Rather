import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { formatQuestion } from '../utils/helpers'

class Unanswered extends Component {
  render() {
    console.log('props from unanswered. author? ', this.props)
    const { question } = this.props
    const { id, status, author} = this.props
    const { timestamp, optionOne, optionTwo } = question
    const { avatarURL } = this.props.author
    return (
      <div className='question-card'>
        <div className='question-poster'>
          <img
            src={avatarURL}
            alt={`Avatar of ${author}`}
            width={100}
            className='card-avatar'
          />
          
        </div>
        <p>Would you rather {optionOne.text} or {optionTwo.text}?</p>
        <Link to={`/question/${id}`} className="question">
          Vote Now
        </Link>
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
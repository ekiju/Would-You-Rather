import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'
import { Link } from 'react-router-dom'

class Details extends Component {
  state = {
    answer: ''
  }
  handleQuestionAnswer = (e) => {
    e.preventDefault()
    console.log('this is props now after submit', this.props)
    const { dispatch, question, qid, authedUser } = this.props
    const {answer} = this.state
    dispatch(handleAddQuestionAnswer({
      qid, 
      authedUser, 
      answer
    }))
  }
  handleChange = (e) => {
    this.setState({ answer: e.target.value });
  }

  chooseVoteOrView() {
    const { question, authedUser } = this.props
    if (question.optionOne.votes.includes(authedUser)) {
      return 'optionOne'
    } else if (question.optionTwo.votes.includes(authedUser)) {
      return "optionTwo"
    } else {
      return "vote"
    }
  }
  convertTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const time = date.toLocaleTimeString('en-US')
    return date.toLocaleDateString() + ' at ' + time.substr(0,5) + time.slice(-2)
  }
  render() {
    const { question, author } = this.props
    const { avatarURL } = this.props.author
    const { answer } = this.state
    const { timestamp, optionOne, optionTwo } = question
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = parseInt(100 * (optionOneVotes / totalVotes), 10)
    const optionTwoPercentage = parseInt(100 - optionOnePercentage, 10);
    
    return (
      <div className="poll-details">
        <h1>Would you rather...</h1>
        <div className='question-poster'>
          <img
            src={avatarURL}
            alt={`Avatar of ${author}`}
            width={100}
            className='card-avatar'
          />
           <div className="post-details">
            <p>Posted by: {author.name}</p>
            <p>On: {this.convertTimestamp(timestamp)}</p>
          </div>
        </div>
        <h3><span className="option-text">{optionOne.text}</span> or <span className="option-text">{optionTwo.text}</span>?</h3>

        {this.chooseVoteOrView() === 'optionOne' || this.chooseVoteOrView() === 'optionTwo' && (
        <div className="poll-container">
          <div className="poll-left">
            <article>
              <p>{optionOneVotes} vote(s)</p>
              <h3 className="percent">{optionOnePercentage}%</h3>
              <p>voted for '{optionOne.text}'</p>
            </article>
          </div>
          <div className="poll-right">
            <article>
              <p>{optionTwoVotes} vote(s)</p>
              <h3 className="percent">{optionTwoPercentage}%</h3>
              <p>voted for '{optionTwo.text}'</p>
            </article>
          </div>
        </div>
        )}
        {this.chooseVoteOrView() === 'optionOne' && (
        <div>
          <p className="user-answer">You voted for '{optionOne.text}'</p>
        </div>
        )}
        {this.chooseVoteOrView() === 'optionTwo' && (
        <div>
          <p className="user-answer">You voted for '{optionTwo.text}'</p>
        </div>
        )}

        {this.chooseVoteOrView() === 'vote' && (
        <div>
          <form
            onSubmit={this.handleQuestionAnswer}
            className="answer-select-form">
            <select
              onChange={this.handleChange}
              defaultValue='Select an answer'>
              <option value='Select an answer' disabled hidden>Select an answer</option>
              <option value='optionOne'>{question.optionOne.text}</option>
              <option value='optionTwo'>{question.optionTwo.text}</option>
            </select>
            <button type="submit" value="Submit" disabled={answer===''}>Submit</button>
          </form>
        </div>
        )}
      <Link to='/'>
        <i className="fa fa-arrow-left" aria-hidden="true"></i></Link>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions, users }, props) {
  const { questionid } = props.match.params
  const question = questions[questionid]
  
  return {
    authedUser,
    question,
    qid: questionid,
    author: questionid ? users[question.author] : null,
  }
}

export default connect(mapStateToProps)(Details)
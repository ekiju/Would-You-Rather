import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestionAnswer } from '../actions/questions'
import { Link } from 'react-router-dom'

class Details extends Component {
  // get id in the params, fetch the question
  // see if question's option one or 2 includes the authedUser
  // if included, get their response. to be optionOne optionTwo or ''.
  // if optionOne or optionTwo, show poll details but it '' show the page that allows user to vote
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
  render() {
    console.log('props in details', this.props)
    const { question } = this.props
    const { author, timestamp, optionOne, optionTwo } = question
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = 100*parseInt(optionOneVotes/totalVotes)
    const optionTwoPercentage = 100*parseInt(optionTwoVotes/totalVotes)
    
    return (
      <div>
        {this.chooseVoteOrView() == 'optionOne' && (
        <div>
          <p>user voted for option one</p>
          <h3>Would you rather {optionOne.text} or {optionTwo.text}</h3>
          <p>{optionOneVotes} voted for option 1</p>
          <p>{optionTwoVotes} voted for option 2</p>
          <hr />
          <p>{optionOnePercentage} percent voted for option 1</p>
          <p>{optionTwoPercentage} percent voted for option 2</p>
        </div>
        )}
        {this.chooseVoteOrView() == 'optionTwo' && (
        <div>
          <p>user voted for option two</p>
          <h3>Would you rather {optionOne.text} or {optionTwo.text}</h3>
          <p>{optionOneVotes} voted for option 1</p>
          <p>{optionTwoVotes} voted for option 2</p>
          <hr />
          <p>{optionOnePercentage} percent voted for option 1</p>
          <p>{optionTwoPercentage} percent voted for option 2</p>
        </div>
        )}
        {this.chooseVoteOrView() == 'vote' && (
        <div>
          <p>Would you rather {optionOne.text} or {optionTwo.text}</p>
          <form
            onSubmit={this.handleQuestionAnswer}>
            <select
              onChange={this.handleChange}
              defaultValue='Select an answer'>
              <option value='Select an answer' disabled hidden>Select an answer</option>
              <option value='optionOne'>{question.optionOne.text}</option>
              <option value='optionTwo'>{question.optionTwo.text}</option>
            </select>
            <input type="submit" value="Submit" />
          </form>
        </div>
        )}
      <Link to='/'>Go Back</Link>
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }, props) {
  const { questionid } = props.match.params
  const question = questions[questionid]
  
  return {
    authedUser,
    question,
    qid: questionid,
    author: questionid ? question.author : null,
  }
}

export default connect(mapStateToProps)(Details)
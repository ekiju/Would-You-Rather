import React, { Component } from 'react'
import { connect } from 'react-redux'


class Details extends Component {
  // get id in the params, fetch the question
  // see if question's option one or 2 includes the authedUser
  // if included, get their response. to be optionOne optionTwo or ''.
  // if optionOne or optionTwo, show poll details but it '' show the page that allows user to vote
  handleOptionOne = (e) => {
    // modify user's answers,
    // modify question's votes
  }
  handleOptionTwo = (e) => {

  }

  render() {

    console.log('props in details', this.props)
    const { question, response } = this.props
    const { author, timestamp, optionOne, optionTwo } = question
    const optionOneVotes = optionOne.votes.length
    const optionTwoVotes = optionTwo.votes.length
    const totalVotes = optionOneVotes + optionTwoVotes
    const optionOnePercentage = 100*parseInt(optionOneVotes/totalVotes)
    const optionTwoPercentage = 100*parseInt(optionTwoVotes/totalVotes)
    
    return (
      <div>
        {response!=='' && (
          <div>
            <h3>Would you rather {optionOne.text} or {optionTwo.text}</h3>
            <p>{optionOneVotes} voted for option 1</p>
            <p>{optionTwoVotes} voted for option 2</p>
            <hr />
            <p>{optionOnePercentage} percent voted for option 1</p>
            <p>{optionTwoPercentage} percent voted for option 2</p>
            <p>You voted for {response}</p>
          </div>
        )}
        {response==='' && (
          <div>
            <button onClick={this.handleOptionOne}>Option One</button>
            <button onClick={this.handleOptionTwo}>Option Two</button>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }, props) {
  const { questionid } = props.match.params
  const question = questions[questionid]
  let response = ''
  if (question.optionOne.votes.includes(authedUser)) {
    response = 'optionOne'
  }
  else if (question.optionTwo.votes.includes(authedUser)) {
    response = 'optionTwo'
  }
  else {
    response = ''
  }
  return {
    response, 
    authedUser,
    question
  }
}

export default connect(mapStateToProps)(Details)
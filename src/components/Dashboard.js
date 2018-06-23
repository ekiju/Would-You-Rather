import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Link } from 'react-router-dom'

class Dashboard extends Component {
  state={
    showAnswered:false,
  }
  handleShowAnswered = (e) => {
    e.preventDefault()
    this.setState({showAnswered: true})
  }
  handleShowUnanswered = (e) => {
    e.preventDefault()
    this.setState({showAnswered: false})
  }
  render() {
    const { showAnswered } = this.state
    const { answeredQuestions, unansweredQuestions } = this.props
    console.log('answered q', answeredQuestions)
    return (
      <div className="dashboard">
        <h1>Poll Questions</h1>
        <div className="filters">
          <h3 onClick={this.handleShowUnanswered}
          style={{fontWeight: !showAnswered ? '700' : '300', color: !showAnswered ? '#f7682f': '#000'}}>Unanswered</h3> |
          <h3 onClick={this.handleShowAnswered}
          style={{fontWeight: showAnswered ? '700' : '300', color: showAnswered ? '#f7682f': '#000'}}>Answered</h3>
        </div>
        <div>
            {showAnswered && (
              answeredQuestions.map((ques) => (
                <Question key={ques} id={ques} status='answered' />
              ))
            )}
        </div>
        <div>
          {!showAnswered && (
            unansweredQuestions.map((ques) => (
              <Question key={ques} id={ques} status='unanswered' />
            ))
          )}
        </div>
        {unansweredQuestions.length === 0 && (
          <div>
            <h3 className="empty-list">You have answered all the questions. Way to go!</h3>
            <h4>Create a new question <Link to="/add">here</Link>!</h4>
          </div>
        )}
      </div>
    )
  }
}

function mapStateToProps({ authedUser, questions }) {
  
  const answeredQuestions = Object.keys(questions)
    .filter(i => (
      questions[i].optionOne.votes.includes(authedUser) ||
      questions[i].optionTwo.votes.includes(authedUser)
    ))
    .sort((a, b) => (
      questions[b].timestamp - questions[a].timestamp
    ));

  const unansweredQuestions = Object.keys(questions)
    .filter(i => (
      !questions[i].optionOne.votes.includes(authedUser) &&
      !questions[i].optionTwo.votes.includes(authedUser)
    ))
    .sort((a, b) => (
      questions[b].timestamp - questions[a].timestamp
    ));

  return {
    answeredQuestions,
    unansweredQuestions,
  };
}

export default connect(mapStateToProps)(Dashboard)
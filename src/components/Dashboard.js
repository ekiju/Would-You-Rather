import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
// import Answered from './Answered';
// import Unanswered from './Unanswered';

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
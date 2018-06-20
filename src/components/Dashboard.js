import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
// import Answered from './Answered';
// import Unanswered from './Unanswered';

class Dashboard extends Component {
  state={
    showAnswered:false,
  }
  handleToggle = (e) => {
    if (this.state.showAnswered) {
      this.setState(() => ({
        showAnswered: false,
      }))
    } else {
      this.setState(() => ({
        showAnswered: true,
      }))
    }
  }
  render() {
    const { showAnswered } = this.state
    const { answeredQuestions, unansweredQuestions } = this.props
    console.log('answered qs: ', answeredQuestions)
    console.log('unanswered qs: ', unansweredQuestions)
    return (
      <div>
        <h1>Dashboard</h1>
        <div>
          <button onClick={this.handleToggle}>Toggle Questions</button>
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
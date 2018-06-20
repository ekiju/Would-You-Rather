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
    console.log(this.props)
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

function mapStateToProps({ authedUser, questions, users }) {
  const currentUser = users[authedUser]
  const unansweredQuestions = []
  Object.keys(questions).map((ques) => {
    if (!currentUser.questions.includes(ques)) {
      unansweredQuestions.push(ques)
    }
  }
  )
  // Object.keys(questions).filter((question) => currentUser.questions.includes(question.id))

  return {
    authedUser,
    answeredQuestions: currentUser.questions,
    unansweredQuestions,
    users
    // answeredQuestions: users.authedUser.questions,
    // unansweredQuestions: !questions.includes(currentUser.questions)
  }
}
export default connect(mapStateToProps)(Dashboard)
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props
    dispatch(handleAddQuestion(this.state))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: '',
      toHome: true
    }))
  }
  handleChangeOne = (e) => {
    let option = e.target.value
    this.setState(() => ({optionOneText:option}))
  }
  handleChangeTwo = (e) => {
    let option = e.target.value
    this.setState(() => ({optionTwoText:option}))
  }
  render() {
    const { toHome, optionOneText, optionTwoText } = this.state
    if (toHome === true) {
      return <Redirect to='/' />
    }
    return (
      <div className="new-question">
        <h3>Add a new question</h3>
        <form className="new-question-form" onSubmit={this.handleSubmit}>
          <p>Would you rather...</p>
          <input type="text" onChange={this.handleChangeOne} value={optionOneText} placeholder="option one" />
          <p>or</p>
          <input type="text" onChange={this.handleChangeTwo} value={optionTwoText} placeholder="option two" />
          <button type="submit" disabled={optionOneText===''||optionTwoText===''}>Submit</button>
        </form>
      </div>
    )
  }
}
export default connect()(NewQuestion)
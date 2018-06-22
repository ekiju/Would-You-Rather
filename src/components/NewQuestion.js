import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect, Link } from 'react-router-dom'

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
        <p>Would you rather...</p>
        <form className="new-question-form" onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChangeOne} value={optionOneText} placeholder="Enter option one..." />
          <p>or</p>
          <input type="text" onChange={this.handleChangeTwo} value={optionTwoText} placeholder="Enter option two..." />
          <button type="submit" disabled={optionOneText===''||optionTwoText===''}>Submit</button>
        </form>
        <Link to='/'>
        <i class="fa fa-arrow-left" aria-hidden="true"></i></Link>
      </div>
    )
  }
}
export default connect()(NewQuestion)
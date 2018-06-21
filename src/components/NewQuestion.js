import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: ''
  }
  handleSubmit = (e) => {
    e.preventDefault();
    const { dispatch } = this.props
    dispatch(handleAddQuestion(this.state))
    this.setState(() => ({
      optionOneText: '',
      optionTwoText: ''
    }))
  }
  handleChange = (e) => {
    let option = e.target.value
    if (option==='optionOne') {
      this.setState(() => ({optionOneText:option}))
    } else {
      this.setState(() => ({optionTwoText:option}))
    }
  }
  render() {
    return (
      <div>
        <h3>Add a new question</h3>
        <form onSubmit={this.handleSubmit}>
          <p>Would you rather </p>
          <input type="text" onChange={this.handleChange} value="optionOne" placeholder="option one" />
          <p>or</p>
          <input type="text" onChange={this.handleChange} value="optionTwo" placeholder="option two" />
          <button type="submit">Create</button>
        </form>
      </div>
    )
  }
}
export default connect()(NewQuestion)
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Error404 extends Component {
  state = {
    toHome: false
  }
  componentDidMount() {
    setInterval(() => this.setState({ toHome: true }), 3000)
  }
  render() {
    console.log('did i get here')
    const { toHome } = this.state
    if (toHome===true) {
      return <Redirect to='/' />
    }
    return (
      <div className="error-page">
        <h1 className='header-center'>Wooooooaaaa hey there! <br /> This page does not exist. You will be redirected back to the login page in 3 seconds...</h1>
      </div>
    )
  }
}
export default Error404
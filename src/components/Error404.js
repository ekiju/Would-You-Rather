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
    const { toHome } = this.state
    if (toHome===true) {
      return <Redirect to='/' />
    }
    return (
      <div className="error-page">
        <h1 className='header-center'>You will be redirected back to main page in 3 seconds...</h1>
      </div>
    )
  }
}
export default Error404
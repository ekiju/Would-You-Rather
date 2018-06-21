import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import Login from './Login'
import Dashboard from './Dashboard'
import Details from './Details'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
// import Error404 from './Error404'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { handleInitialData } from '../actions/shared'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container' >
            <Nav />
            {this.props.loading === true && (
            <Redirect to='/login' /> )}
            <Route exact path ='/login' component={Login} />
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/question/:questionid' component={Details} />
            <Route exact path='/add' component={NewQuestion} />
            <Route exact path='/leaderboard' component={Leaderboard} />
            
          </div>
        </Fragment>
      </Router>
    );
  }
}
function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  }
}
export default connect(mapStateToProps)(App);

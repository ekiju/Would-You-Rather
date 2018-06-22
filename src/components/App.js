import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Login from './Login'
import Dashboard from './Dashboard'
import Details from './Details'
import Leaderboard from './Leaderboard'
import NewQuestion from './NewQuestion'
import Error404 from './Error404'
import Nav from './Nav'
import LoadingBar from 'react-redux-loading'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
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
          {this.props.loading == false && (
            <Nav />
          )}
            <Switch>
              <Route exact path ='/login' component={Login} />
              <PrivateRoute exact path='/' component={Dashboard} />
              <PrivateRoute exact path='/question/:questionid' component={Details} />
              <PrivateRoute exact path='/add' component={NewQuestion} />
              <PrivateRoute exact path='/leaderboard' component={Leaderboard} />
              <Route component={Error404} />
            </Switch>
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

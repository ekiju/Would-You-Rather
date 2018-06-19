import React, { Component } from 'react'
import Answered from './Answered';
import Unanswered from './Unanswered';

class Details extends Component {
  render() {
    return (
      <div>
        answered: <Answered />
        unanswered: <Unanswered />
      </div>
    )
  }
}
export default Details
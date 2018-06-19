import React, { Component } from 'react'


class Details extends Component {
  // getStatus = () => {
  //   const { status } = this.props
  //   console.log('this is status from details', status)
  // }
  render() {
    const { status } = this.props
    console.log('get status ', status)
    return (
      <div>
        Details of the poll (either to vote or to view results)
      </div>
    )
  }
}
export default Details
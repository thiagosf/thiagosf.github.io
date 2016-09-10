import React, { Component } from 'react'
import classnames from 'classnames'

class Spinner extends Component {
  render() {
    const spinnerClassname = classnames({
      'spinner-box': true,
      'absolute': this.props.absolute,
      'hide-spinner': !this.props.show
    })
    return(
      <div className={spinnerClassname}>
        <div className="spinner">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    )
  }
}

export default Spinner

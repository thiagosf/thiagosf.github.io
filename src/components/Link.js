import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link as LinkRouter } from 'react-router'
import { setCurrentLink } from '../actions/nav'

class Link extends Component {
  setCurrentLink(e) {
    this.props.setCurrentLink(e.currentTarget.getAttribute('href'))
    return e
  }
  render() {
    const props = {}
    for (let i in this.props) {
      if (i != 'setCurrentLink') {
        props[i] = this.props[i]
      }
    }
    return(
      <LinkRouter 
        {...props}
        onClick={this.setCurrentLink.bind(this)}
        />
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setCurrentLink: (link) => {
      return dispatch(setCurrentLink(link))
    }
  }
}

export default connect(null, mapDispatchToProps)(Link)

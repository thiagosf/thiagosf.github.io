import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { CommonSectionContainer } from './'

class PlaygroundContainer extends Component {
  render() {
    return(
      <CommonSectionContainer>
        <header className="page-header">
          <h1>Playground</h1>
        </header>
        <div className="page-content">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
      </CommonSectionContainer>
    )
  }
}

export default PlaygroundContainer

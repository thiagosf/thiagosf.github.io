import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon } from '../components'
import { HeaderContainer } from './'

class AppContainer extends Component {
  render() {
    return(
      <div className="page-app">
        <HeaderContainer />
        <div className="page-content-box">
          {this.props.children}
          <div className="container-fluid">
            <footer className="main-footer">
              <p>
                Desenvolvido com <a href="https://facebook.github.io/react/" target="_blank">React</a> e <a href="http://redux.js.org/" target="_blank">Redux</a>
              </p>
              <p className="small-text">
                Conteúdo sob lincença <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Atribuição 4.0 Internacional</a>.
              </p>
            </footer>
          </div>
        </div>
      </div>
    )
  }
}

export default AppContainer

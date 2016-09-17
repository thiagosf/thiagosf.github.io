import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import classnames from 'classnames'
import { Icon } from '../components'
import { HeaderContainer, NotificationContainer } from './'
import { checkLink } from '../actions/nav'

class AppContainer extends Component {
  componentDidMount() {
    this.props.checkLink(this.props.location)
  }
  render() {
    const page_content_box = classnames({
      'page-content-box': true,
      'enter': this.props.page.enter
    })
    return(
      <div className="page-app">
        <HeaderContainer />
        <div className={page_content_box}>
          <NotificationContainer />
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

const mapStateToProps = (state) => {
  return {
    page: state.page
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    checkLink: (location) => {
      return dispatch(checkLink(location))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)

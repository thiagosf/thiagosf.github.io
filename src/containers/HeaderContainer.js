import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from '../components'
import { toggleNav } from '../actions/nav'

class HeaderContainer extends Component {
  toggleNav(e) {
    e.preventDefault()
    this.props.toggleNav()
  }
  render() {
    const main_header_classname = classnames({
      'main-header': true,
      'opened-nav': this.props.nav.opened
    })
    return(
      <header className={main_header_classname}>
        <div className="container-fluid">
          <div className="logo-box">
            <Link to="/">
              <span className="logo"><Icon name="logo" /></span>
              <span className="author">Thiago S.F.</span>
            </Link>
          </div>
          <a href="#" className="open-nav" onClick={this.toggleNav.bind(this)}>
            <span className="open"><Icon name="menu2" /></span>
            <span className="close"><Icon name="close" /></span>
          </a>
          <nav className="main-nav">
            <ul className="list-unstyled">
              <li><a href="#">Sobre</a></li>
              <li><a href="#">Projetos</a></li>
              <li><a href="#">Playground</a></li>
              <li><a href="#">Posts</a></li>
            </ul>
          </nav>
        </div>
        <span className="nib-box"><Icon name="nib" /></span>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNav: () => {
      return dispatch(toggleNav())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

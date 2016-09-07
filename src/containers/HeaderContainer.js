import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from '../components'
import { toggleNav } from '../actions/nav'
import { onScroll } from '../actions/header'

class HeaderContainer extends Component {
  componentDidMount() {
    let last_scroll_top = 0;
    window.addEventListener('scroll', () => {
      let scroll_top = document.body.scrollTop || document.documentElement.scrollTop
      let direction = scroll_top > last_scroll_top ? 'down' : 'up'
      last_scroll_top = scroll_top
      this.props.onScroll(scroll_top, direction)
    })
  }
  toggleNav(e) {
    e.preventDefault()
    this.props.toggleNav()
  }
  render() {
    const main_header_classname = classnames({
      'main-header': true,
      'small': this.props.header.small,
      'opened-nav': this.props.nav.opened
    })
    return(
      <header className={main_header_classname}>
        <div className="logo-wrapper">
          <div className="container-fluid">
            <div className="logo-box">
              <Link to="/">
                <span className="logo"><Icon name="logo" /></span>
                <span className="author">Thiago S.F.</span>
              </Link>
            </div>
            <a href="#" className="open-nav" onClick={this.toggleNav.bind(this)}>
              <span className="open"><Icon name="menu" /></span>
              <span className="close"><Icon name="close" /></span>
            </a>
          </div>
          <span className="nib-box"><Icon name="nib" /></span>
        </div>
        <nav className="main-nav">
          <ul className="list-unstyled">
            <li><a href="#" className="active">Sobre</a></li>
            <li><a href="#">Projetos</a></li>
            <li><a href="#">Playground</a></li>
            <li><a href="#">Posts</a></li>
          </ul>
          <span className="nib-box"><Icon name="nib" /></span>
        </nav>
      </header>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nav: state.nav,
    header: state.header
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleNav: () => {
      return dispatch(toggleNav())
    },
    onScroll: (scroll_top, direction) => {
      return dispatch(onScroll(scroll_top, direction))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

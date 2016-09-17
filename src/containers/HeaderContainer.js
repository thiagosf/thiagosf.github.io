import React, { Component } from 'react'
import { connect } from 'react-redux'
import classnames from 'classnames'
import { Link } from 'react-router'
import { Icon } from '../components'
import { toggleNav, setCurrentLink } from '../actions/nav'
import { onScroll } from '../actions/header'

const RenderNav = ({ onClick, label, link, active }) => {
  const link_classname = classnames({
    active: active
  })
  return (
    <li>
      <Link className={link_classname} onClick={onClick} to={link}>{label}</Link>
    </li>
  )
}

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
  setCurrentLink(e) {
    const href = e.currentTarget.getAttribute('href')
    this.props.setCurrentLink(href)
    if (href != '/') {
      this.props.toggleNav()
    }
    return e
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
              <Link to="/" onClick={this.setCurrentLink.bind(this)}>
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
            {this.props.nav.links.map((item) => {
              return (
                <RenderNav 
                  onClick={this.setCurrentLink.bind(this)} 
                  key={item.link} 
                  {...item} 
                  />
              )
            })}
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
    },
    setCurrentLink: (link) => {
      return dispatch(setCurrentLink(link))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)

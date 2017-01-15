import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'
import classnames from 'classnames'
import { CommonSectionContainer } from './'
import { Spinner } from '../components'
import { meta } from '../helpers'
import { fetchPage } from '../actions/page'

const PlaygroundItem = ({ item }) => {
  const shortLink = (link) => {
    return link.replace(/(https?:\/\/|www\.)/i, '')
  }
  return (
    <div className="project-item">
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <a href={item.link} target="_blank" className="btn btn-info btn-sm">{shortLink(item.link)}</a>
    </div>
  )
}

class PlaygroundContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Playground')
    this.props.fetchPage('playground')
  }
  renderPageItems() {
    if (!this.hasLoading()) {
      const { page } = this.props
      return page.page.pageItems.map((item) =>
        <PlaygroundItem key={item._id} item={item} />
      )
    }
  }
  hasLoading() {
    const { page } = this.props
    return page.fetch_pages || Object.keys(page.page).length == 0
  }
  render() {
    const headerClassnames = classnames({
      'page-header': true,
      'hide': this.hasLoading()
    })
    return(
      <CommonSectionContainer>
        <header className={headerClassnames}>
          <h1>Playground</h1>
        </header>
        <div className="projects-box">
          <Spinner absolute show={this.hasLoading()} />
          {this.renderPageItems()}
        </div>
      </CommonSectionContainer>
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
    fetchPage: (slug) => {
      dispatch(fetchPage(slug))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlaygroundContainer)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'
import classnames from 'classnames'
import { CommonSectionContainer } from './'
import { Spinner } from '../components'
import { meta, markdown } from '../helpers'
import { fetchPage } from '../actions/page'

const ProjectItem = ({ item }) => {
  const shortLink = (link) => {
    return link.replace(/(https?:\/\/|www\.)/i, '')
  }
  const button = () => {
    if (item.discontinued) {
      return (
        <a className="btn btn-warning btn-sm" disabled>
          @deprecated
        </a>
      )
    } else {
      return (
        <a href={item.link} target="_blank" className="btn btn-info btn-sm">
          {shortLink(item.link)}
        </a>
      )
    }
  }
  return (
    <div className="project-item">
      <h2>{item.title}</h2>
      <p dangerouslySetInnerHTML={markdown.convert(item.description)} />
      {button()}
    </div>
  )
}

class ProjectsContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Projetos')
    this.props.fetchPage('projetos')
  }
  renderPageItems() {
    if (!this.hasLoading()) {
      const { page } = this.props
      return page.page.pageItems.map((item) =>
        <ProjectItem key={item._id} item={item} />
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
          <h1>Projetos</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsContainer)

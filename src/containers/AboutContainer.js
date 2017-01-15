import React, { Component } from 'react'
import { connect } from 'react-redux'
import Gravatar from 'react-gravatar'
import classnames from 'classnames'
import { CommonSectionContainer } from './'
import { Spinner, Icon } from '../components'
import { meta, markdown } from '../helpers'
import { fetchPage } from '../actions/page'

const PageKeyValue = ({ item }) => {
  let link = item.value
  switch (item.key) {
    case 'email' : link = `mailto:${link}`; break;
    case 'github' : link = `https://github.com/${link}`; break;
    case 'linkedin' : link = `https://www.linkedin.com/in/${link}`; break;
  }
  return (
    <div className="col-sm-4">
      <a href={link} target="_blank"><Icon name={item.key} /></a>
    </div>
  )
}

class AboutContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Sobre')
    this.props.fetchPage('sobre')
  }
  renderKeyValues() {
    if (!this.hasLoading()) {
      const { page } = this.props
      return page.page.keyValues.map((item) =>
        <PageKeyValue key={item._id} item={item} />
      )
    }
  }
  hasLoading() {
    const { page } = this.props
    return page.fetch_pages || Object.keys(page.page).length == 0
  }
  render() {
    const { page } = this.props
    let body = '';
    if (!this.hasLoading() && page.page.body) body = page.page.body
    const headerClassnames = classnames({
      'page-header': true,
      'hide': this.hasLoading()
    })
    const aboutPhotoBoxClassnames = classnames({
      'about-photo-box': true,
      'hide': this.hasLoading()
    })
    return(
      <CommonSectionContainer>
        <div className={aboutPhotoBoxClassnames}>
          <Gravatar email="thiago@thiagosf.net" alt="" className="img-thumbnail img-circle" size={150} />
        </div>
        <header className={headerClassnames}>
          <h1>Sobre</h1>
        </header>
        <div className="page-content" dangerouslySetInnerHTML={markdown.convert(body)} />
        <Spinner absolute show={this.hasLoading()} />
        <div className="contact-links">
          <div className="row">
            {this.renderKeyValues()}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(AboutContainer)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CommonSectionContainer } from './'
import { PostList } from '../components'
import { meta, settings } from '../helpers'
import { fetchPosts } from '../actions/post'

class HomeContainer extends Component {
  componentDidMount() {
    meta.setTitle(settings.get('full_title'))
    this.props.fetchPosts()
  }
  getLoader() {
    if (this.props.post.fetch_posts) {
      return <p>Carregando...</p>
    }
  }
  render() {
    return(
      <div className="container-fluid">
        <section className="post-list-section">
          <div className="panel panel-default">
            <div className="panel-body panel-body-large">
              {this.getLoader()}
              <PostList posts={this.props.post.posts} />
            </div>
          </div>
        </section>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.post
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchPosts: (page = 1) => {
      dispatch(fetchPosts(page))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

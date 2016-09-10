import React, { Component } from 'react'
import { connect } from 'react-redux'
import { CommonSectionContainer } from './'
import { PostList, Spinner } from '../components'
import { meta, settings } from '../helpers'
import { fetchHomePosts } from '../actions/post'

class HomeContainer extends Component {
  componentDidMount() {
    meta.setTitle(settings.get('full_title'))
    if (this.props.post.home_posts.length == 0) {
      this.props.fetchHomePosts()
    }
  }
  render() {
    return(
      <div className="container-fluid">
        <section className="post-list-section">
          <div className="panel panel-default">
            <div className="panel-body panel-body-large">
              <Spinner absolute show={this.props.post.fetch_posts} />
              <PostList posts={this.props.post.home_posts} />
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
    fetchHomePosts: () => {
      dispatch(fetchHomePosts())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer)

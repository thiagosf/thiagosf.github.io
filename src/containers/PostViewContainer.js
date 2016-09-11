import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, Comments, LatestPosts, Spinner, PostView } from '../components'
import { meta } from '../helpers'
import { fetchPost } from '../actions/post'

class PostViewContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Material Design Lite: o framework html do Google')
    if (this.props.params.slug) {
      this.props.fetchPost(this.props.params.slug)
    }
  }
  getPostView() {
    const { post } = this.props
    if (post.post.id) {
      return <PostView post={post.post} />
    }
  }
  render() {
    const { post } = this.props
    return(
      <div>
        <section className="post-section">
          <div className="container-fluid">
            <div className="panel panel-default">
              <div className="panel-body panel-body-large">
                <Spinner absolute show={post.fetch_posts} />
                {this.getPostView()}
              </div>
            </div>
          </div>
        </section>
        <Comments />
        <LatestPosts />
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
    fetchPost: (slug) => {
      dispatch(fetchPost(slug))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostViewContainer)

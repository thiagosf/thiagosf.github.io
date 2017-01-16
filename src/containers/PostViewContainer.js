import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { Icon, Comments, Spinner, PostView } from '../components'
import { LatestPostsContainer } from './'
import { meta } from '../helpers'
import { fetchPost } from '../actions/post'

class PostViewContainer extends Component {
  componentDidMount() {
    this.loadPost()
  }
  componentWillUpdate() {
    setTimeout(this.loadPost.bind(this), 100)
  }
  loadPost() {
    if (this.props.params.slug && this.props.params.slug != this.current_slug) {
      this.current_slug = this.props.params.slug
      this.props.fetchPost(this.props.params.slug)
    }
  }
  getPostView() {
    const { post } = this.props
    if (post.post.id) {
      return <PostView post={post.post} />
    }
  }
  getLatestPostsContainer() {
    const { post } = this.props
    if (post.post.id) {
      return <LatestPostsContainer post={post} />
    }
  }
  getComments() {
    const { post } = this.props
    if (post.post.id) {
      return <Comments post={post.post} />
    }
  }
  render() {
    const { post } = this.props
    if (post.post.title) {
      meta.setSubTitle(post.post.title)
    }
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
        {this.getComments()}
        {this.getLatestPostsContainer()}
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { LatestPosts, Spinner } from '../components'
import { fetchLatestPosts } from '../actions/post'

class LatestPostsContainer extends Component {
  componentDidMount() {
    this.fetchLatestPosts()
  }
  componentWillUpdate() {
    setTimeout(this.fetchLatestPosts.bind(this), 100)
  }
  fetchLatestPosts() {
    const { post } = this.props
    if (post.post.id != this.current_post_id) {
      this.current_post_id = post.post.id
      this.props.fetchLatestPosts(post.post.id)
    }
  }
  render() {
    const { post } = this.props
    return(
      <div>
        <LatestPosts posts={post.latest_posts} />
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
    fetchLatestPosts: (current_post_id) => {
      dispatch(fetchLatestPosts(current_post_id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LatestPostsContainer)

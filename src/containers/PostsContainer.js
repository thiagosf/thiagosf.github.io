import React, { Component } from 'react'
import { LatestPosts } from '../components'
import { meta } from '../helpers'

class PostsContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Posts')
  }
  render() {
    return(
      <div>
        <LatestPosts />
      </div>
    )
  }
}

export default PostsContainer

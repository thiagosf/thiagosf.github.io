import React, { Component } from 'react'
import moment from 'moment'
import classnames from 'classnames'
import { Link } from './'
import { Icon } from './'

const PostItem = ({ title, excerpt, link, created_at, image }) => {
  const postImage = (image) => {
    if (image) {
      return(
        <div className="post-image img-thumbnail">
          <Link to="/posts-test"><img src={image} /></Link>
        </div>
      )
    }
  }
  const postInfoClassname = classnames({
    'post-info': true,
    'with-image': image
  })
  return (
    <div className="post-list-item">
      {postImage(image)}
      <div className={postInfoClassname}>
        <div className="post-time">
          {moment(created_at).format('LLLL')}
        </div>
        <h2 className="post-title">
          <Link to={link}>{title}</Link>
        </h2>
        <p className="post-excerpt">
          {excerpt}
        </p>
      </div>
    </div>
  )
}

class PostList extends Component {
  render() {
    return(
      <div>
        {this.props.posts.map(item => <PostItem key={item.id} {...item} />)}
      </div>
    )
  }
}

export default PostList

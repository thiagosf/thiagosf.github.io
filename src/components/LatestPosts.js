import React, { Component } from 'react'
import { Link } from './'
import { Icon } from './'

const PostItem = ({ title, created_at, link }) => {
  return(
    <div className="post-item">
      <div className="post-time">
        {created_at}
      </div>
      <p className="post-title">
        <Link to={link}>{title}</Link>
      </p>
    </div>
  )
}

class LatestPosts extends Component {
  render() {
    return(
      <section className="latest-posts-section">
        <div className="container-fluid">
          <h3>
            <Icon name="hourglass" /> Últimos posts
          </h3>
          {this.props.posts.map((item) => {
            return <PostItem key={item.id} {...item} />
          })}
        </div>
      </section>
    )
  }
}

export default LatestPosts

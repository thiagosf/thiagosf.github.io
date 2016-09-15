import React, { Component } from 'react'
import classnames from 'classnames'
import { Link, Icon } from './'

const PostItem = ({ title, image, created_at, link, excerpt }) => {
  const postImage = (image) => {
    if (image) {
      return(
        <div className="post-image img-thumbnail">
          <Link to={link}><img src={image} /></Link>
        </div>
      )
    }
  }
  const postInfoClassname = classnames({
    'post-info': true,
    'with-image': image
  })
  return(
    <div className="post-item">
      {postImage(image)}
      <div className={postInfoClassname}>
        <div className="post-time">
          {created_at}
        </div>
        <h4 className="post-title">
          <Link to={link}>{title}</Link>
        </h4>
        <p className="post-excerpt">
          <Link to={link}>{excerpt}</Link>
        </p>
      </div>
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
          <div className="row">
            {this.props.posts.map((item) => {
              return (
                <div className="col-sm-6" key={item.id}>
                  <PostItem {...item} />
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
  }
}

export default LatestPosts

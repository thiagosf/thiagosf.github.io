import React, { Component } from 'react'
import moment from 'moment'
import { ShareButtons } from 'react-share'
import { Icon } from './'
import { settings, markdown } from '../helpers'

class PostView extends Component {
  getImage() {
    const { post } = this.props
    if (post.image_header) {
      return(
        <div className="post-image">
          <img src={post.image_header} className="img-thumbnail" />
        </div>
      )
    }
  }
  render() {
    const { post } = this.props
    const url = settings.getUrlToShare()
    return(
      <div>
        <div className="post-time">
          <span className="icon"><Icon name="time" /></span> {moment(post.created_at).format('LL')}
        </div>
        <header className="post-header">
          <h1>{post.title}</h1>
        </header>
        {this.getImage()}
        <div className="post-content" dangerouslySetInnerHTML={markdown.convert(post.body)} />
        <div className="share-box">
          <ShareButtons.GooglePlusShareButton title={post.title} url={url}>
            <Icon name="google-plus" />
          </ShareButtons.GooglePlusShareButton>
          <ShareButtons.TwitterShareButton title={post.title} url={url}>
            <Icon name="twitter" />
          </ShareButtons.TwitterShareButton>
          <ShareButtons.FacebookShareButton title={post.title} url={url}>
            <Icon name="facebook" />
          </ShareButtons.FacebookShareButton>
        </div>
      </div>
    )
  }
}

export default PostView

import React, { Component } from 'react'
import moment from 'moment'
import showdown from 'showdown'
import { Icon } from './'

class PostView extends Component {
  convertMarkdown() {
    const converter = new showdown.Converter()
    const body = this.props.post.body
    return { __html: converter.makeHtml(body) }
  }
  render() {
    const { post } = this.props
    return(
      <div>
        <div className="post-time">
          <span className="icon"><Icon name="time" /></span> {moment(post.created_at).format('LLLL')}
        </div>
        <header className="post-header">
          <h1>{post.title}</h1>
        </header>
        <div className="post-content" dangerouslySetInnerHTML={this.convertMarkdown()} />
        <div className="share-box">
          <a href="#"><Icon name="google-plus" /></a>
          <a href="#"><Icon name="twitter" /></a>
          <a href="#"><Icon name="facebook" /></a>
        </div>
      </div>
    )
  }
}

export default PostView

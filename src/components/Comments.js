import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon } from './'

class Comments extends Component {
  render() {
    return(
      <section className="comments-section">
        <div className="container-fluid">
          <h2>
            <span className="icon"><Icon name="comment" /></span> Comentários
          </h2>
          <div className="panel panel-default">
            <div className="panel-body">
              Disqus
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Comments

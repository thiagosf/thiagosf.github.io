import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon } from './'

class LatestPosts extends Component {
  render() {
    return(
      <section className="latest-posts-section">
        <div className="container-fluid">
          <h3>
            <Icon name="hourglass" /> Últimos posts
          </h3>
          <div className="posts-box">
            <div className="post-item">
              <div className="post-time">
                11 de Abril de 2016
              </div>
              <p className="post-title">
                <Link to="/posts/nome-do-post">Deixando seu servidor um pouco mais seguro</Link>
              </p>
            </div>
            <div className="post-item">
              <div className="post-time">
                11 de Abril de 2016
              </div>
              <p className="post-title">
                <Link to="/posts/nome-do-post">Deixando seu servidor um pouco mais seguro</Link>
              </p>
            </div>
            <div className="post-item">
              <div className="post-time">
                11 de Abril de 2016
              </div>
              <p className="post-title">
                <Link to="/posts/nome-do-post">Deixando seu servidor um pouco mais seguro</Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default LatestPosts

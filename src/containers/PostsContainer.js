import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostList, Icon } from '../components'
import { meta } from '../helpers'
import { fetchPosts, filterPosts } from '../actions/post'

class PostsContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Posts')
    this.props.fetchPosts()
  }
  getLoader() {
    if (this.props.post.fetch_posts) {
      return <p>Carregando...</p>
    }
  }
  searchPosts(e) {
    e.preventDefault()
    const filter = this.refs.filter.value
    if (filter.length >= 2) {
      this.props.filterPosts(filter)
    } else {
      this.refs.filter.placeholder = 'Mínimo de 2 caracteres'
      this.refs.filter.focus()
      setTimeout(() => {
        this.refs.filter.placeholder = 'Pesquise'
      }, 1300)
    }
  }
  render() {
    return(
      <div className="container-fluid">
        <header className="page-header text-center">
          <h1>Posts</h1>
        </header>
        <section className="post-list-section">
          <div className="panel panel-default">
            <div className="panel-body panel-body-large">
              <form className="form-filter-post" onSubmit={this.searchPosts.bind(this)}>
                <div className="form-group">
                  <input type="text" ref="filter" placeholder="Pesquise" className="form-control"/>
                </div>
                <button><Icon name="search" /></button>
              </form>
              {this.getLoader()}
              <PostList posts={this.props.post.posts} />
            </div>
          </div>
        </section>
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
    fetchPosts: (page = 1) => {
      dispatch(fetchPosts(page))
    },
    filterPosts: (filter) => {
      dispatch(filterPosts(filter))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsContainer)

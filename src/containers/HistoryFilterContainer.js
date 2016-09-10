import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PostList, Icon } from '../components'
import { meta } from '../helpers'
import { fetchPosts, filterPosts } from '../actions/post'

class HistoryFilterContainer extends Component {
  historyFilters() {
    return this.props.filters.map((item) => {
      return <li key={item}><small onClick={this.setFilter.bind(this, item)}>{item}</small></li>
    })
  }
  setFilter(item) {
    this.props.input.value = item
    this.props.input.select()
    this.props.filterPosts(item)
  }
  render() {
    if (this.props.filters.length == 0) return false
    return(
      <ul className="list-inline history-filters">
        {this.historyFilters()}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    filters: state.post.filters
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    filterPosts: (filter) => {
      dispatch(filterPosts(filter, false))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HistoryFilterContainer)

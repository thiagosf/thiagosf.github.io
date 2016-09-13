import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { CommonSectionContainer } from './'
import { meta } from '../helpers'
import playground from '../data/playground'

const PlaygroundItem = ({ title, link, description }) => {
  const shortLink = (link) => {
    return link.replace(/(https?:\/\/|www\.)/i, '')
  }
  return (
    <div className="project-item">
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={link} target="_blank" className="btn btn-info btn-sm">{shortLink(link)}</a>
    </div>
  )
}

class PlaygroundContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Playground')
  }
  render() {
    return(
      <CommonSectionContainer>
        <header className="page-header">
          <h1>Playground</h1>
        </header>
        <div className="projects-box">
          {playground.map((item, index) => {
            return <PlaygroundItem key={index} {...item} />
          })}
        </div>
      </CommonSectionContainer>
    )
  }
}

export default PlaygroundContainer

import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { CommonSectionContainer } from './'
import { meta } from '../helpers'
import projects from '../data/projects'

const ProjectItem = ({ title, link, description }) => {
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

class ProjectsContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Projetos')
  }
  render() {
    return(
      <CommonSectionContainer>
        <header className="page-header">
          <h1>Projetos</h1>
        </header>
        <div className="projects-box">
          {projects.map((item, index) => {
            return <ProjectItem key={index} {...item} />
          })}
        </div>
      </CommonSectionContainer>
    )
  }
}

export default ProjectsContainer

import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { meta } from '../helpers'
import projects from '../data/projects'

const ProjectItem = ({ title, link, description }) => {
  const shortLink = (link) => {
    return link.replace(/(https?:\/\/|www\.)/i, '')
  }
  return (
    <div className="project-item">
      <div className="panel panel-default">
        <div className="panel-body panel-body-large">
          <div className="panel-heading">
            {title}
          </div>
          <p>{description}</p>
          <a href={link} target="_blank" className="btn btn-primary btn-sm">{shortLink(link)}</a>
        </div>
      </div>
    </div>
  )
}

class ProjectsContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Projetos')
  }
  render() {
    return(
      <div className="container-fluid">
        <header className="page-header text-center">
          <h1>Projetos</h1>
        </header>
        <div className="projects-box">
          {projects.map((item, index) => {
            return <ProjectItem key={index} {...item} />
          })}
        </div>
      </div>
    )
  }
}

export default ProjectsContainer

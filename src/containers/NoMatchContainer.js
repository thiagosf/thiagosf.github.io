import React, { Component } from 'react'
import { CommonSectionContainer } from './'
import { meta } from '../helpers'

class NoMatchContainer extends Component {
  componentDidMount() {
    meta.setSubTitle('Página não encontrada')
  }
  render() {
    return(
      <CommonSectionContainer>
        <header className="page-header">
          <h1>Página não encontrada</h1>
        </header>
        <div className="page-content">
          <p>Ops, a página que tentou acessar não existe.</p>
        </div>
      </CommonSectionContainer>
    )
  }
}

export default NoMatchContainer

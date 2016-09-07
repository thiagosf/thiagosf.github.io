import React, { Component } from 'react'
import Gravatar from 'react-gravatar'
import { CommonSectionContainer } from './'
import { Icon } from '../components'

class AboutContainer extends Component {
  render() {
    return(
      <CommonSectionContainer>
        <div className="about-photo-box">
          <Gravatar https={true} email="thiago@thiagosf.net" alt="" className="img-thumbnail img-circle" size={150} />
        </div>
        <header className="page-header">
          <h1>Sobre</h1>
        </header>
        <div className="page-content">
          <p>Trabalho com desenvolvimento web desde 2006, comecei utilizando a linguagem ASP, logo migrei para PHP, onde me especializei. Depois de muito tempo trabalhando com minhas próprias bibliotecas, tive a oportunindade de conhecer o framework CakePHP. Acredito que seja um passo essencial para qualquer desenvolvedor, utilizar um framework ajuda na produtividade e escalabilidade dos projetos.</p>
          <p>Em paralelo ao back-end, sempre estudei front-end, e como aconteceu com o CakePHP, conheci o jQuery e suas infinitas possibilidades. Criei meu primeiro plugin para jQuery, e desde então, trabalho com esse framework. Também utilizo SASS, Compass, Twitter Bootstrap, Foundation, entre outras ferramentas.</p>
          <p>Desde 2014 venho trabalhando com Ruby On Rails, além de ser uma linguagem gostosa de se trabalhar, ele me ajudou muito com o pensamento do TDD, pois até então, conhecia apenas de vista.</p>
          <p>Recentemente comecei a criar projetos com React, e cá entre nós, é muito massa! Facilita muito para criar single-page applications maneiras.</p>
          <p>Procuro me atualizar sempre, bem como estudos de UI, UX, Responsive Design, Configuração de Servidores, Vagrant, Docker, Azk, entre outros.</p>
          <p>Hoje, sou full-stack developer na Slideworks.cc, onde estou aprimorando meu Ruby On Rails e iniciando uma aventura com Node.js, além de muito front-end, pitadas de infraestrutura de servidores cloud e, quando preciso, umas pinceladas no design.</p>
          <h2>Contatos</h2>
          <p>Quer trocar uma idéia? Segue abaixo meus contatos.</p>
        </div>
        <div className="contact-links">
          <div className="row">
            <div className="col-sm-4">
              <a href="mailto:thiago@thiagosf.net"><Icon name="mail" /></a>
            </div>
            <div className="col-sm-4">
              <a href="https://github.com/thiagosf/" target="_blank"><Icon name="github" /></a>
            </div>
            <div className="col-sm-4">
              <a href="https://www.linkedin.com/in/thiagosfsjc" target="_blank"><Icon name="linkedin" /></a>
            </div>
          </div>
        </div>
      </CommonSectionContainer>
    )
  }
}

export default AboutContainer

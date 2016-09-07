import React, { Component } from 'react'
import { Link } from 'react-router'
import { Icon } from '../components'
import { HeaderContainer } from './'

class AppContainer extends Component {
  render() {
    return(
      <div className="page-app">
        <HeaderContainer />
        <div className="page-content-box">
          <section className="post-section">
            <div className="container-fluid">
              <div className="panel panel-default">
                <div className="panel-body">
                  <div className="post-time">
                    <span className="icon"><Icon name="time" /></span> 9 de Julho de 2015 18:05
                  </div>
                  <header className="post-header">
                    <h1>Material Design Lite: o framework html do Google</h1>
                  </header>
                  <div className="post-content">
                    <p>Faz algum tempo que o Material Design do Google foi lançado, alguns desenvolvedores aplicaram esse conceito criando seus próprios framewoks html, porém nenhum oficial.</p>
                    <h2>Um sub-titulo</h2>
                    <h3>Um sub-titulo</h3>
                    <h4>Um sub-titulo</h4>
                    <h5>Um sub-titulo</h5>
                    <h6>Um sub-titulo</h6>
                    <p>Essa semana foi lançado o MDL: Material Design Lite, framework criado pelo Google. Ele traz vários componentes para criar páginas web seguindo o conceito do Material Design. No site, você pode testar vários templates legais, mostrando como utilizar em seu site, blog, aplicativo web, etc.</p>
                    <p>Ele chega sendo uma alternativa aos vários frameworks do mercado, como o Foundation,<a href="#">Bootstrap</a>, Pure, UIkit, entre outros. Particularmente eu prefiro o Foundation, tem ótimas ferramentas para sites responsivos, bastante personalizável, e segue um conceito de nomes de classes bem amigáveis.</p>
                    <ul>
                      <li>Uma lista</li>
                      <li>No meio do conteudo</li>
                    </ul>
                    <blockquote>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                      <footer>
                        Mahatma Gandhi
                      </footer>
                    </blockquote>
                    <p>Entretanto, vale a pena dar uma olhada com calma no MDL, seja para utilizar em admin ou mesmo sites em geral.</p>
                    <p><a href="#">http://www.getmdl.io/</a></p>
                  </div>
                </div>
              </div>
            </div>
          </section>
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
                    <Link to="/">Deixando seu servidor um pouco mais seguro</Link>
                  </p>
                </div>
                <div className="post-item">
                  <div className="post-time">
                    11 de Abril de 2016
                  </div>
                  <p className="post-title">
                    <Link to="/">Deixando seu servidor um pouco mais seguro</Link>
                  </p>
                </div>
                <div className="post-item">
                  <div className="post-time">
                    11 de Abril de 2016
                  </div>
                  <p className="post-title">
                    <Link to="/">Deixando seu servidor um pouco mais seguro</Link>
                  </p>
                </div>
              </div>
            </div>
          </section>
          <footer className="main-footer">
            <p>
              Desenvolvido com <a href="https://facebook.github.io/react/" target="_blank">React</a> e <a href="http://redux.js.org/" target="_blank">Redux</a>
            </p>
            <p className="small-text">
              Conteúdo sob lincença <a href="http://creativecommons.org/licenses/by/4.0/" target="_blank">Creative Commons Atribuição 4.0 Internacional</a>.
            </p>
          </footer>
        </div>
      </div>
    )
  }
}

export default AppContainer

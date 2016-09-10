import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  FILTER_POSTS
} from '../constants'

export const fetchPosts = ({ page = 1, filter = null }) => {
  return dispatch => {
    dispatch({ type: REQUEST_POSTS })
    setTimeout(() => {
      let posts = [{
        id: 1,
        image: 'http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2015/03/materialdesign.jpg',
        title: 'Sites estáticos com Middleman ' + filter,
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }, {
        id: 2,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Material_Design.svg/2000px-Material_Design.svg.png',
        title: 'Sites estáticos com Middleman',
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }, {
        id: 3,
        image: 'https://d13yacurqjgara.cloudfront.net/users/409459/screenshots/1770941/drawer.gif',
        title: 'Sites estáticos com Middleman',
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }, {
        id: 4,
        image: null,
        title: 'Sites estáticos com Middleman',
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }]
      dispatch({ type: RECEIVE_POSTS, posts })
    }, 1000)
  }
}

export const fetchPost = (id) => {
  return dispatch => {
    dispatch({ type: REQUEST_POST })
    setTimeout(() => {
      let post = {
        id: 1,
        image: 'http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2015/03/materialdesign.jpg',
        title: 'Sites estáticos com Middleman',
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }
      dispatch({ type: RECEIVE_POST, post })
    }, 2000)
  }
}

export const filterPosts = (filter) => {
  return dispatch => {
    dispatch({ type: FILTER_POSTS, filter })
    dispatch(fetchPosts({ filter: filter }))
  }
}

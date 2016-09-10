import {
  REQUEST_HOME_POSTS,
  RECEIVE_HOME_POSTS,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  FILTER_POSTS
} from '../constants'

export const fetchHomePosts = () => {
  return dispatch => {
    dispatch({ type: REQUEST_HOME_POSTS })
    setTimeout(() => {
      let posts = [{
        id: 1,
        image: 'http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2015/03/materialdesign.jpg',
        title: 'Sites estáticos com Middleman',
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
      dispatch({ type: RECEIVE_HOME_POSTS, posts })
    }, 3000)
  }
}

export const fetchPosts = ({ page = 1, limit = 10, filter = null }) => {
  return dispatch => {
    console.log('-- pagina', page, '-- filter', filter)
    dispatch({ type: REQUEST_POSTS, page: page })
    setTimeout(() => {
      let posts = [{
        id: 10 + page,
        image: 'http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2015/03/materialdesign.jpg',
        title: 'Sites estáticos com Middleman ' + filter,
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }, {
        id: 20 + page,
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Material_Design.svg/2000px-Material_Design.svg.png',
        title: 'Sites estáticos com Middleman',
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }, {
        id: 30 + page,
        image: 'https://d13yacurqjgara.cloudfront.net/users/409459/screenshots/1770941/drawer.gif',
        title: 'Sites estáticos com Middleman',
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }, {
        id: 40 + page,
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

export const filterPosts = (filter, add_filter = true) => {
  return dispatch => {
    dispatch({ type: FILTER_POSTS, filter: filter, add_filter: add_filter })
    dispatch(fetchPosts({ filter: filter }))
  }
}

export const nextPage = () => {
  return (dispatch, getState) => {
    const post = getState().post
    dispatch(fetchPosts({
      page: post.page + 1,
      filter: post.filter
    }))
  }
}

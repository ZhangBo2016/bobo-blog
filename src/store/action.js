import axios from 'axios'

const setAuthorizationToken = token => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common['Authorization']
  }
}

(function () {
  const item = JSON.parse(localStorage.getItem('jwtToken'))

  if (item) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${item.token}`
  }
})()

export default {
  eidtArticle ({dispatch, rootState}, {updateState, article, id}) {
    const url = updateState ? `modify/${id}` : `save`

    return axios.post(`/serve/article/${url}`, {
      ...article
    })
      .then(function (response) {
        return response.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getArticles ({commit}) {
    axios.get('/serve/article/list')
      .then((res) => {
        commit('UpdateArticleList', res.data.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  register ({state, commit}, user) {
    axios.post('/serve/user/register', {
      user
    })
    .then(function (response) {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error)
    })
  },
  login ({commit}, user) {
    return axios.post('/serve/user/login', {
      ...user
    })
      .then(function (response) {
        const data = response.data
        if (data.success) {
          const token = data.data.token
          const username = data.data.username
          const role = data.data.role
          const item = {token, username, role}
          localStorage.setItem('jwtToken', JSON.stringify(item))
          setAuthorizationToken(token)
          commit('ModifyUserName', username)
        }
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  loginout ({commit}) {
    setAuthorizationToken()

    commit('ModifyUserName', '')
  },
  updateUser ({commit}, username) {
    commit('ModifyUserName', username)
  },
  getArticle ({commit}, id) {
    return axios.get(`/serve/article/detail/${id}`)
      .then((res) => {
        return res.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  getTagOptions ({commit}) {
    return axios.get('/serve/tag/list')
      .then((res) => {
        return res.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  createTag ({commit}, {tag}) {
    return axios.post('/serve/tag/create', {
      ...tag
    })
      .then((res) => {
        return res.data.data
      })
      .catch(function (error) {
        console.log(error)
      })
  }
}

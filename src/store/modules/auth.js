import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    authUser(state) {
      return state.user || null
    },
    isAuthenticated(state) {
      return !!state.user
    }
  },
  actions: {
    userLogin(context, formData) {
      return axios.post('/api/v1/users/login', formData)
        .then(res => {
          const user = res.data
          context.commit('setAuthUser', user)
        })
    },
    userRegister(context, formData) {
      return axios.post('/api/v1/users/register', formData)
    },
    userLogout(context) {
      return axios.post('/api/v1/users/logout')
        .then(() => {
          context.commit('setAuthUser', null)
          return true
        })
        .catch(err => {
          console.log(err)
          return err
        })
    },
    getAuthUser(context) {
      return axios.get('/api/v1/users/me')
        .then(res => {
          const user = res.data
          context.commit('setAuthUser', user)
          return user
        })
        .catch(err => {
          commit('setAuthUser', null)
          console.log(err)
          return err
        })
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return state.user = user
    }
  }
}
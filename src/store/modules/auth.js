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
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return state.user = user
    }
  }
}
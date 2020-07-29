import axios from 'axios'

export default {
  namespaced: true,
  state: {
    user: null,
    isAuthResolved: false
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
      const authUser = context.getters['authUser']
      if(authUser) {
        return Promise.resolve(authUser)
      }

      return axios.get('/api/v1/users/me')
        .then(res => {
          const user = res.data
          context.commit('setAuthUser', user)
          context.commit('setAuthState', true)
          return user
        })
        .catch(err => {
          context.commit('setAuthUser', null)
          context.commit('setAuthState', true)
          console.log(err)
          return err
        })
    }
  },
  mutations: {
    setAuthUser(state, user) {
      return state.user = user
    },
    setAuthState(state, authState) {
      return state.isAuthResolved = authState
    }
  }
}
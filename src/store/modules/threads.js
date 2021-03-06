import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {},
  actions: {
    fetchThreads(context, id) {
      context.commit('setItems', { resource: 'threads', items: [] }, { root: true })
      return axios.get(`/api/v1/threads?meetupId=${id}`).then(res => {
        const threads = res.data
        context.commit('setItems', { resource: 'threads', items: threads }, { root: true })
        return context.state.threads
      })
    }
  },
  mutations: {}
}
import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: []
  },
  getters: {},
  actions: {
    fetchCategories(context) {
      axios.get("/api/v1/categories").then(res => {
        const categories = res.data;
        context.commit('setItems', { resource: 'categories', items: categories }, { root: true })
        return context.state.categories
      })
    },
  },
  mutations: {}
}
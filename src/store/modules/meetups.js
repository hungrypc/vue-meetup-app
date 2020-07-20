import axios from 'axios'

export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  getters: {},
  actions: {
    fetchMeetups(context) {
      axios.get('/api/v1/meetups').then(res => {
        const meetups = res.data
        context.commit('setItems', { resource: 'meetups', items: meetups }, { root: true })
        return context.state.meetups
      })
    },
    fetchMeetup(context, id) {
      context.commit('setItem', { resource: 'meetups', item: {} }, { root: true })
      axios.get(`/api/v1/meetups/${id}`).then(res => {
        const meetup = res.data
        context.commit('setItem', { resource: 'meetups', item: meetup }, { root: true })
        return context.state.meetup
      })
    },
  },
  mutations: {}
}
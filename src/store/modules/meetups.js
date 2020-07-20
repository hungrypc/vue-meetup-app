export default {
  namespaced: true,
  state: {
    items: [],
    item: {}
  },
  getters: {

  },
  actions: {
    fetchMeetups(context) {
      axios.get('/api/v1/meetups').then(res => {
        const meetups = res.data
        context.commit('setItems', { resource: 'meetups', items: meetups })
        return context.state.meetups
      })
    },
    fetchMeetup(context, id) {
      context.commit('setItems', { resource: 'meetup', items: {} })
      axios.get(`/api/v1/meetups/${id}`).then(res => {
        const meetup = res.data
        context.commit('setItems', { resource: 'meetup', items: meetup })
        return context.state.meetup
      })
    },
  },
  mutations: {

  }
}
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    meetups: [],
    categories: [],
    threads: [],
    meetup: {}
  },
  getters: {
    meetups(state) {   // not being used
      return state.meetups 
    },
    categories(state) { // not being used
      return state.categories
    }
  },
  actions: {
    fetchMeetups(context) {
      axios.get('/api/v1/meetups').then(res => {
        const meetups = res.data
        context.commit('setMeetups', meetups)
        return context.state.meetups
      })
    },
    fetchCategories(context) {
      axios.get("/api/v1/categories").then(res => {
        const categories = res.data;
        context.commit('setCategories', categories)
        return context.state.categories
      })
    },
    fetchMeetup(context, id) {
      axios.get(`/api/v1/meetups/${id}`).then(res => {
        const meetup = res.data
        context.commit('setMeetup', meetup)
        return context.state.meetup
      })      
    },
    fetchThreads(context, id) {
      axios.get(`/api/v1/threads?meetupId=${id}`).then(res => {
        const threads = res.data
        context.commit('setThreads', threads)
        return context.state.threads
      })
    }
  },
  mutations: {
    setMeetups(state, values) {
      state.meetups = values
    },
    setCategories(state, values) {
      state.categories = values
    },
    setMeetup(state, values) {
      state.meetup = values
    },
    setThreads(state, values) {
      state.threads = values
    }
  }
})
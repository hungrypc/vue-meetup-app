import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

import meetups from './modules/meetups'
import categories from './modules/categories'
import threads from './modules/threads'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meetups,
    categories,
    threads
  },
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
        context.commit('setItems', { resource: 'meetups', items: meetups })
        return context.state.meetups
      })
    },
    fetchCategories(context) {
      axios.get("/api/v1/categories").then(res => {
        const categories = res.data;
        context.commit('setItems', { resource: 'categories', items: categories })
        return context.state.categories
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
    fetchThreads(context, id) {
      context.commit('setItems', { resource: 'threads', items: [] })
      axios.get(`/api/v1/threads?meetupId=${id}`).then(res => {
        const threads = res.data
        context.commit('setItems', { resource: 'threads', items: threads })
        return context.state.threads
      })
    }
  },
  mutations: {
    setItems(state, { resource, items }) {
      state[resource] = items
    }
  }
})
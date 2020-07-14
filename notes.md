# Notes

## Proxy, fetching categories data
So we have our server running on port 3001, and our client running on port 8080. The way we have our data fetched is by hitting the client port, but our db is on 3001. 

```js
// PageHome.vue script
export default {
    data() {
      return {
        categories: []
      }
    },
    created() {
      axios.get('/api/v1/categories')
        .then(res => {
          this.categories = res.data
        })
    }

  }
```
We need to set up a proxy.  

```js
// vue.config.js
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:3001'
      }
    }
  }
}
```

## Vuex - State Management
### Setup
```js
// src/store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  // where we store data, shared with components
  state: {
  },
  // simple functions to get state from this store, like computed properties
  getters: {
  },
  // like methods, shouldn't mutate state. good place to fetch data. action call should resolve into data
  actions: {
  },
  // simple functions to mutate state
  mutations: {
  }
})

// main.js
import store from './store'
// ...
new Vue({
  router,
  store,  // add store
  render: h => h(App),
}).$mount('#app')
```

### Example
```js
// store
export default new Vuex.Store({
  state: {
    meetups: [],
    categories: [],
    threads: [],
    meetup: {}
  },
  getters: {
    meetups(state) {
      // get state values
      return state.meetups
    },
    categories(state) {
      // get state values
      return state.categories
    }
  },
  actions: {
    fetchMeetups(context) {
      axios.get('/api/v1/meetups').then(res => {
        const meetups = res.data
        // grab data, commit to mutation
        context.commit('setMeetups', meetups)
      })
    },
    fetchCategories(context) {
      axios.get("/api/v1/categories").then(res => {
        const categories = res.data;
        // grab data, commit to mutation
        context.commit('setCategories', categories)
      });
    }
  },
  mutations: {
    setMeetups(state, values) {
      // set values to state
      state.meetups = values
    },
    setCategories(state, values) {
      // set values to state
      state.categories = values
    }
  }
})


// PageHome
export default {
  components: {
    CategoryItem,
    MeetupItem
  },
  computed: {
    meetups() {
      // get store state data
      return this.$store.getters['meetups']
    },
    categories() {
      // get store state data
      return this.$store.getters['categories']
    }
  },
  created() {
    // run store actions on mount
    this.$store.dispatch('fetchMeetups')
    this.$store.dispatch('fetchCategories')
  }
};
```

## Injecting Vuex into Components
For some reason, we're not going to use the above implementation (because the instructor is shit and doesn't explain why, the fucking idiot).

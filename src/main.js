import Vue from 'vue'
import moment from 'moment'
import vuelidate from 'vuelidate'

import App from './App.vue'
import AppDropdown from './components/shared/AppDropdown'
import AppHero from './components/shared/AppHero'
import Spinner from './components/shared/Spinner'

import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.component('AppHero', AppHero)
Vue.component('AppDropdown', AppDropdown)
Vue.component('Spinner', Spinner)

Vue.use(vuelidate)

Vue.filter('capitalize', function (value) {
  if (value && typeof value === 'string') {
    return value.charAt(0).toUpperCase() + value.slice(1)
  }
  return ''
})

Vue.filter('formatDate', function(value, formatType='LL') {
  if (!value) return ''
  return moment(value).format(formatType)
})

new Vue({
  router,
  store,
  vuelidate,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import Router from 'vue-router'

import PageHome from '@/pages/PageHome'
import PageMeetupDetail from '@/pages/PageMeetupDetail'
import PageMeetupFind from '@/pages/PageMeetupFind'
import PageNotFound from '@/pages/PageNotFound'
import NotAuthenticated from '@/pages/NotAuthenticated'
import Login from '@/pages/Login'
import Register from '@/pages/Register'
import Secret from '@/pages/Secret'

import store from '@/store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'PageHome',
      component: PageHome
    },
    {
      path: '/find',
      name: 'PageMeetupFind',
      component: PageMeetupFind
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        onlyGuestUser: true
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        onlyGuestUser: true
      }
    },
    {
      path: '/meetups/secret',
      name: 'Secret',
      component: Secret,
      meta: {
        onlyAuthUser: true
      }
    },
    {
      path: '/meetups/:id',
      name: 'PageMeetupDetail',
      component: PageMeetupDetail
    },
    {
      path: '/401',
      name: 'NotAuthenticated',
      component: NotAuthenticated
    },
    {
      path: '*',
      name: 'PageNotFound',
      component: PageNotFound
    }
  ],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  store.dispatch('auth/getAuthUser')
  .then(() => {
    const isAuthenticated = store.getters['auth/isAuthenticated']
    
    if (to.meta.onlyAuthUser && !isAuthenticated) {
      next({ name: 'NotAuthenticated' })
    }
    if (to.meta.onlyGuestUser && isAuthenticated) {
      next({ name: 'PageHome' })
    }

    next()
  })
})

export default router
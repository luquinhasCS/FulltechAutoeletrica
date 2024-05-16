import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/MainView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/services',
    name: 'services',
    component: () => import('../views/ServiceListView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, from, next) => {
  const isUserLogged = store.getters['auth/isLoggedIn']

  if (to.matched.some((record) => record.meta.requiresAuth) && !isUserLogged) {
    next({ name: 'home' })
  } else if (to.name === '/' && isUserLogged) {
    next({ name: 'main' })
  } else {
    next()
  }
})

export default router

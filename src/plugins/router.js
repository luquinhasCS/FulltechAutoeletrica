import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

function guardMyroute(to, from, next) {
  var isAuthenticated= false
  if(localStorage.getItem('SET_USER_DATA')){
    console.log(localStorage)
    isAuthenticated = true
  }
  else
    isAuthenticated = false
  if(isAuthenticated) 
  {
    next()
  } 
  else
  {
    next('/')
  }
}

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
  },
  {
    path: '/main',
    name: 'main',
    beforeEnter : guardMyroute,
    component: () => import('../views/MainView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/services',
    name: 'services',
    beforeEnter : guardMyroute,
    component: () => import('../views/ServiceListView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router

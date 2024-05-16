import Vue from 'vue'
import Vuex from 'vuex'
import auth from './_modules/auth'
import user from './_modules/user'
import services from './_modules/services'


Vue.use(Vuex)

export default new Vuex.Store({
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    services
  }
})
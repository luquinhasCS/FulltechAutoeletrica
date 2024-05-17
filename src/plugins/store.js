import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'
import auth from './_modules/auth'
import user from './_modules/user'
import services from './_modules/services'
import appointments from './_modules/appointments'


Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'Fulltech',
  storage: window.localStorage,
})

export default new Vuex.Store({
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    auth,
    user,
    services,
    appointments
  },
  plugins: [vuexPersist.plugin],
})
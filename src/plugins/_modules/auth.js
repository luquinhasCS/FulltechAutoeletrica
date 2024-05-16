import api from '../_api'

const state = {
    isLoggedIn: false
  }

  const mutations = {
    SET_LOGIN(state) {
      state.isLoggedIn = true
    },
    SET_LOGOUT(state) {
        state.isLoggedIn = false
      },
  }

  const actions = {
    async login({ commit, dispatch }, cpf) {
        const response = await api.Usuario.GetByCpf(cpf)
        if (response !== false) {
            commit('SET_LOGIN')
            dispatch('user/setUserData', response, { root: true })
            return response
        }
      },
    logout({ commit }) {
      commit('SET_LOGOUT')
      dispatch('user/setUserData', {}, { root: true })
    }
  }

  const getters = {
    isLoggedIn: state => state.isLoggedIn
  }

  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
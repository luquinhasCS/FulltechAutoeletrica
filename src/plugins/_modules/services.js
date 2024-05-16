import api from '../_api'

const state = {
    services: []
  }

  const mutations = {
    SET_SERVICES(state, services) {
        state.services = services
    }
  }

  const actions = {
    fetchServices({ commit }) {
        return api.Servico.GetAll()
          .then(data => {
            commit('SET_SERVICES', data)
          })
          .catch(error => {
            console.log('There was an error:', error.response)
          })
      }
  }

    const getters = {
      getServices: state => state.services
    }

    export default {
      namespaced: true,
      state,
      mutations,
      actions,
      getters
    }
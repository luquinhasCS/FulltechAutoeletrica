import api from '../_api'

const state = {
  data: {}
}

const mutations = {
  SET_USER_DATA(state, userData) {
    state.data = userData
  }
}

const actions = {
  setUserData({ commit }, userData) {
    commit('SET_USER_DATA', userData)
  },
  async addUser({ commit }, user) {
    try {
       const usuario = await api.Usuario.GetByCpf(user.cpf_cadastro)
       if (usuario) {
         throw new Error('Já existe um usuário com esse CPF')
       }
      const novoUsuario = {
        nome: user.nome.trim(),
        cpf: user.cpf_cadastro,
        email: user.email.toLowerCase().trim(),
        telefone: user.telefone.trim(),
        admin: false
      }

      await api.Usuario.Post(novoUsuario)
    } catch (error) {
      return error
    }
  }
}

  const getters = {
    getUser: state => state.data
  }

  export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
  }
import api from '../_api'

const state = {
  appointments: [],
}

const mutations = {
  SET_APPOINTMENTS(state, appointments) {
    state.appointments = appointments
  },
}

const actions = {
  async fetchAppointments({ commit, dispatch }, { isAdmin, userId }) {
    try {
      const appointments = isAdmin
        ? await api.Atendimento.GetAll()
        : await api.Atendimento.GetAllByUser(userId)

      const services = await dispatch('services/fetchServices', null, {
        root: true,
      })
      const servicesDict = services.reduce((acc, service) => {
        acc[service.id] = service
        return acc
      }, {})

      appointments.forEach((appointment) => {
        appointment.servicos = appointment.servicos.map((servico) => {
          const foundService = servicesDict[servico.id]
          if (foundService) {
            return { ...foundService, ...servico }
          }

          return servico
        })
      })

      commit('SET_APPOINTMENTS', appointments)
    } catch (error) {
      console.log('There was an error:', error)
    }
  },
  async deleteAppointment({ dispatch }, { appointmentId, isAdmin, userId }) {
    if (!isAdmin) {
      return
    }
    try {
      await api.Atendimento.Delete(appointmentId)
      await dispatch('fetchAppointments', { isAdmin, userId })
    } catch (error) {
      console.log('There was an error:', error)
    }
  },
  async updateAppointment(
    { dispatch },
    { appointmentData, appointmentId, isAdmin, userId }
  ) {
    if (!isAdmin) {
      return
    }
    try {
      const result = await api.Atendimento.Put(appointmentId, appointmentData)

      await dispatch('fetchAppointments', { isAdmin, userId })

      return result
    } catch (error) {
      console.log('There was an error:', error)
    }
  },
  async createAppointment({ dispatch }, { appointment, vehicle, user }) {
    appointment.servicos = appointment.services.map((id) => ({ id, status: 0 }))
    appointment.veiculo = vehicle
    appointment.idUsuario = user.id
    appointment.status = 0
    const result = await api.Atendimento.Post(appointment)
    return result
  },
}

const getters = {
  getAppointments: (state) => state.appointments,
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
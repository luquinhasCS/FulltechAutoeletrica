<template>
  <v-container fluid class="mt-6">
  <v-card dark >
    <v-card-title>
      <v-col class="d-flex" style="gap:16px">
        <v-btn v-if="this.getUser.admin" color="success" class="botao"><v-icon x-large>mdi-plus-circle</v-icon></v-btn>
        <v-btn color="black" class="botao white--text" @click="reloadPage"><v-icon x-large>mdi-refresh</v-icon></v-btn>
      </v-col>
    </v-card-title>
    <v-card-text>
      <EditServicesScreen
      v-model="showEditAppointmentModal"
      :appointment.sync="selectedAppointment"
      />
      <v-data-table
        :headers="headers"
        :items="appointmentList"
        class="elevation-1"
      >
        <template v-slot:[`item.servicos`]="{ item }">
          <div
            v-for="(service) in item.servicos"
            :key="service.id"
            class="d-flex align-center"
          >
            <span>
              {{ service.nome }}
              <v-icon :color="statusServicesIcons[service.status].color">
                {{ statusServicesIcons[service.status].name }}
              </v-icon>
            </span>
          </div>
        </template>
        <template v-slot:[`item.status`]="{ item }">
          <v-chip color="green" dark>{{ getStatusName(item.status) }}</v-chip>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon
            large
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            large
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
import { statusAppointment, statusServicesIcons, statusServices } from '../models/status.js'
import EditServicesScreen from './EditServicesScreen'


export default {
  data() {
    return {
      headers: [],
      appointmentList: [],
      statusServicesIcons,
      statusServices,
      showEditAppointmentModal: false,
      selectedAppointment: {},
    }
  },
  methods: {
    sanitizedData(data){
        return JSON.parse(JSON.stringify(data))
    },
    getStatusName(status) {
        return statusAppointment[status]
      },
    async fetchData() {
      try {
        if(this.getUser.admin) {
          this.$api.Atendimento.GetAll().then((result) => {
            this.appointmentList = this.sanitizedData(result)

            const servicePromises = this.appointmentList.map((appointment) => {
            const individualServicePromises = appointment.services.map((service) => {
                return this.$api.Servico.GetById(service).then((result) => result)
              })
              return Promise.all(individualServicePromises).then((services) => {
                appointment.servicos = services
              })
            })
          })
        } else {
            console.log(this.getUser.id)
          this.$api.Atendimento.GetAllByUser(this.getUser.id).then((result) => {
            this.appointmentList = this.sanitizedData(result)

            const servicePromises = this.appointmentList.map((appointment) => {
            const individualServicePromises = appointment.services.map((service) => {
                return this.$api.Servico.GetById(service).then((result) => result)
              })
              return Promise.all(individualServicePromises).then((services) => {
                appointment.servicos = services
              })
            })
          })          
        }
        
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    editItem(item) {
      this.selectedAppointment = item
      this.showEditAppointmentModal = true
    },
    deleteItem(item) {
      alert(`Delete ${item}`)
    },
    reloadPage() {
      window.location.reload()
    },
  },
  components: {
      EditServicesScreen,
    },
  mounted() {
    this.headers = [
        { text: 'Veículo', align: 'center', sortable: true, value: 'veiculo.model' },
        { text: 'Cor', align: 'center', value: 'veiculo.color' },
        { text: 'Placa', align: 'center', value: 'veiculo.license_plate' },
        { text: 'Serviços', align: 'center', value: 'servicos'},
        { text: 'Status', align: 'center', value: 'status' },
      ].concat(this.getUser.admin ? [{ text: 'Ações', align: 'center', value: 'actions' }] : []),
    this.fetchData()
  },
  computed:{
    ...mapGetters({
        getUser: 'user/getUser',
    }),
  }
}
</script>

<style scoped>
.botao {
  border-radius: 50%;
  width: 50px;
  min-width: 50px !important;
  height: 50px !important;
}
</style>
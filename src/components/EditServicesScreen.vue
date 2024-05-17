<template>
  <v-dialog v-model="show" max-width="800px">
    <v-card>
      <v-card-title>
        <span class="text-h5">Editar Serviços</span>
        <v-spacer></v-spacer>
        <v-btn icon @click.stop="show = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-row v-if="showAddServiceRow" class="pt-3">
        <v-col>
          <v-select
            v-model="newSelectedServices"
            :items="servicesAllowedToAdd"
            item-text="nome"
            return-object
            label="Adicionar Serviços"
            chips
            multiple
            outlined
          ></v-select>
        </v-col>
      </v-row>
      <v-row v-if="showAddServiceRow" class="custom-row">
        <v-col cols="2">
          <v-btn @click="showAddServiceRow = false">CANCELAR</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn color="success" @click="addNewServices">ADICIONAR</v-btn>
        </v-col>
      </v-row>
      <v-btn
        v-if="!showAddServiceRow"
        icon
        @click="toggleControls"
        color="green"
        class="btn-add"
      >
        <v-icon left>mdi-plus-circle</v-icon>
        Novo serviço
      </v-btn>

      <v-data-table :headers="headers" :items="newServices" hide-default-footer>
        <template v-slot:[`item.status`]="{ item }">
          <v-select
            :items="StatusServices"
            v-model="item.status"
            item-text="status"
            item-value="id"
            label=""
          ></v-select>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-btn icon @click="deleteService(item)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
        </template>
      </v-data-table>

      <v-row class="custom-save-row">
        <v-col cols="2">
          <v-btn @click.stop="show = false">CANCELAR</v-btn>
        </v-col>
        <v-col cols="2">
          <v-btn @click="updatedAppointment" color="success">SALVAR</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
  import { StatusServices } from '../models/status.js'
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        headers: [
          { text: 'Nome', value: 'nome', sortable: false },
          { text: 'Status do Serviço', value: 'status', sortable: false },
          { text: 'Excluir', value: 'actions', sortable: false },
        ],
        StatusServices,
        newServices: null,
        showAddServiceRow: false,
        newSelectedServices: [],
      }
    },
    watch: {
      appointment: {
        handler(newAppointment) {
          if (newAppointment && newAppointment.servicos) {
            this.newServices = JSON.parse(
              JSON.stringify(newAppointment.servicos)
            )
          }
        },
        immediate: true,
      },
    },
    methods: {
      async updatedAppointment() {
        const allStatusZero = this.newServices.every(
          (service) => service.status === 0
        )
        const allStatusTwo = this.newServices.every(
          (service) => service.status === 2
        )

        let overallStatus
        if (allStatusZero) {
          overallStatus = 0
        } else if (allStatusTwo) {
          overallStatus = 2
        } else {
          overallStatus = 1
        }

        const newAppointment = {
          ...this.appointment,
          servicos: this.newServices,
          status: overallStatus,
        }

        const updateAppointment = await this.$store.dispatch(
          'appointments/updateAppointment',
          {
            appointmentData: newAppointment,
            appointmentId: this.appointment.id,
            isAdmin: this.getUser.admin,
            userId: this.getUser.id,
          }
        )

        if (!!updateAppointment) {
          this.show = false
        } else console.log('ERROR')
      },
      deleteService(item) {
        this.newServices = this.newServices.filter(
          (servico) => servico.id !== item.id
        )
      },
      resetData() {
        this.newServices = JSON.parse(JSON.stringify(this.appointment.servicos))
      },
      toggleControls() {
        this.showAddServiceRow = !this.showAddServiceRow
      },
      addNewServices() {
        if (this.newSelectedServices) {
          this.newSelectedServices = this.newSelectedServices.map((service) => {
            return { ...service, status: StatusServices[0].id }
          })
          this.newServices = [...this.newServices, ...this.newSelectedServices]
          this.newSelectedServices = []
          this.showAddServiceRow = false
        }
      },
    },
    props: {
      value: Boolean,
      appointment: Object,
    },
    computed: {
      show: {
        get() {
          return this.value
        },
        set(value) {
          this.$emit('input', value)
          if (!value) {
            this.resetData()
          }
        },
      },
      servicesAllowedToAdd() {
        return this.getServices.filter(
          (service) =>
            !this.newServices.some((newService) => newService.id === service.id)
        )
      },
      ...mapGetters({
        getServices: 'services/getServices',
        getUser: 'user/getUser',
      }),
    },
  }
</script>

<style scoped>
  .v-application .v-dialog {
    max-width: 800px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .v-application .v-card {
    background-color: white;
    padding: 16px;
  }

  .btn-add {
    margin: 28px 16px;
    width: 160px;
  }

  .custom-row {
    margin-bottom: 16px;
    margin-top: -24px;
  }

  .custom-save-row {
    margin-bottom: 16px;
    margin-top: 8px;
  }
</style>
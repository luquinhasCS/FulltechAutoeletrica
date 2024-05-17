<template>
  <v-container class="background" fluid>
    <v-col class="d-flex justify-center align-center" style="gap: 50px">
      <v-col class="flex-grow-0">
        <v-btn elevation="2" class="btn-main pa-5 px-9" outlined @click="dialog = true">SOLICITAR SERVIÇO</v-btn>
        <v-dialog v-model="dialog" transition="dialog-top-transition" width="800">
          <v-card class="pa-2">
            <v-col class="d-flex justify-space-between">
              <v-col class="text-h6 pa-0">Novo Atendimento</v-col>
              <v-icon class="ml-5" color="black" medium @click="dialog = false">mdi-close</v-icon>
            </v-col>
            <v-card>
              <v-col class="d-flex justify-space-between align-center grey lighten-3 pa-0">
              <v-col class="d-flex flex-grow-0">
                <v-icon color="black" large>mdi-numeric-1-circle-outline</v-icon>
                <v-col class="font-weight-medium">Cliente</v-col>
              </v-col>
              <v-col>
                <svg width="100%" xmlns="http://www.w3.org/2000/svg">
                  <line x1="600" style="stroke:black;stroke-width:3" />
                </svg>
              </v-col>
              <v-col class="d-flex flex-grow-0">
                <v-icon color="grey" large>mdi-numeric-2-circle-outline</v-icon>
                <v-col class="font-weight-medium grey--text" >Serviço</v-col>
              </v-col>
            </v-col>
          </v-card>
          <v-col class="d-flex flex-column align-center">
            <v-col style="width: 50% !important">
              <v-text-field v-mask="'###.###.###-##'" placeholder="000.000.000-00" v-model="cpf_input" class="mb-2" label="CPF" outlined color="grey"></v-text-field>
            </v-col>
          </v-col>
            <v-card-actions class="justify-end">
              <v-col class="d-flex justify-space-between">
                <v-btn v-if="this.getUser.admin" large color="success" width="30%" @click.stop="showDialog=true">Cadastrar usuário</v-btn>
              <RegisterScreen v-model="showDialog"/>

              <v-btn large color="success" width="30%" @click="dialog2 = true" v-bind:disabled="disabledButton ? true : false">Continuar</v-btn>
              </v-col>
              <v-dialog v-model="dialog2" width="800">
                <v-card class="pa-6">
                  <v-col class="d-flex text-center">
                    <v-card-text class="text-h6 pa-0" style="width: inherit">Ordem de serviço</v-card-text>
                    <v-spacer></v-spacer>
                    <v-icon class="ml-5" color="black" medium @click="dialog2 = false">mdi-close</v-icon>
                  </v-col>
                  <v-card class="mb-3">
                    <v-col class="d-flex justify-space-between align-center grey lighten-3 pa-0">
                      <v-col class="d-flex flex-grow-0">
                        <v-icon color="grey" large>mdi-numeric-1-circle-outline</v-icon>
                        <v-col class="font-weight-medium grey--text">Cliente</v-col>
                      </v-col>
                      <v-col>
                        <svg width="100%" xmlns="http://www.w3.org/2000/svg">
                          <line x1="600" style="stroke:black;stroke-width:3" />
                        </svg>
                      </v-col>
                      <v-col class="d-flex flex-grow-0">
                        <v-icon color="black" large>mdi-numeric-2-circle-outline</v-icon>
                        <v-col class="font-weight-medium" >Serviço</v-col>
                      </v-col>
                    </v-col>
                  </v-card>
                    <v-col class="d-flex">
                      <v-col cols="8" class="py-0">
                        <v-text-field v-model="vehicle.model" label="Modelo do Veículo" outlined color="grey"></v-text-field>
                      </v-col>
                      <v-col cols="4" class="py-0">
                        <v-text-field v-model="vehicle.color" label="Cor do Veículo" outlined color="grey"></v-text-field>
                      </v-col>
                    </v-col>
                    <v-col class="d-flex">
                      <v-col cols="8" class="py-0">
                        <v-text-field v-model="vehicle.license_plate" label="Placa do Veículo" outlined color="grey"></v-text-field>
                      </v-col>
                      <v-col cols="4" class="py-0">
                        <v-select
                        v-model="vehicle.year"
                        label="Ano do Veículo"
                        outlined color="grey"
                        :items="years"
                        item-text="nome"
                        item-value="nome"
                        no-title></v-select>
                      </v-col>
                    </v-col>
                    <v-col class="d-flex">
                      <v-col cols="8" class="py-0">
                        <v-select v-model="appointment.services" label="Serviços" outlined color="grey" :items="services" item-text="nome" item-value="id" multiple></v-select>
                      </v-col>
                      <v-col cols="4" class="py-0">
                        <v-menu
                          ref="menu"
                          v-model="menuActive"
                          :close-on-content-click="false"
                          :return-value="appointment.date"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              v-model="appointment.date"
                              label="Picker in menu"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="appointment.date"
                            no-title
                            scrollable
                            locale="pt-br"
                          >
                            <v-spacer></v-spacer>
                            <v-btn
                              text
                              color="primary"
                              @click="menu = false"
                            >
                              CANCELAR
                            </v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(appointment.date)"
                            >
                              SALVAR
                            </v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                    </v-col>
                    <v-col class="d-flex justify-space-between">
                      <v-btn color="black" class="white--text" @click="dialog2 = false">VOLTAR</v-btn>
                      <v-btn color="success" @click="dialog = false; dialog2 = false; createAppointment()">CRIAR ORDEM DE SERVIÇO</v-btn>
                    </v-col>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col class="flex-grow-0">
        <v-btn  elevation="2" class="btn-main pa-5  px-9" outlined to="/services">LISTA DE SERVIÇOS</v-btn>
      </v-col>
    </v-col>
  </v-container>
</template>

<script setup>
  import { reactive, shallowRef } from 'vue'
  import { mapGetters } from 'vuex'
  import RegisterScreen from './RegisterScreen.vue'
  import { ref } from 'vue'

  const menu = ref()
  const menuActive = ref(false)

  const dialog = shallowRef(false)
  const dialog2 = shallowRef(false)
</script>

<script>
  export default {
    components: {
      RegisterScreen,
    },
    data () {
      return {
        cpf_input: false,
        disabledButton: true,
        dialog: false,
        dialog2: false,
        showDialog: false,
        menuActive: false,

        user: undefined,
        vehicle: reactive({
            model: '',
            license_plate: '',
            color: '',
            year: null,
          }),
        appointment: reactive({
          date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substring(0, 10),
          services: [],
        }),
        services: [],
      }
    },
    methods: {
      async login() {
        if (this.cpf_input !== '') {
          const user = await this.$store.dispatch('user/CheckIfUserExists', this.cpf_input)
          if (user) {
            this.disabledButton = false
            this.user = user
          }
        }
      },
      async fetchData() {
        try {
          this.$api.Servico.GetAll().then((result) => {
            this.services = result
          })
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      },
      sanitizedData(data){
        return JSON.parse(JSON.stringify(data))
      },
      async createAppointment() {
        const createdAppointment = await this.$store.dispatch(
          'appointments/createAppointment',
          {
            appointment: this.sanitizedData(this.appointment),
            vehicle: this.sanitizedData(this.vehicle),
            user: this.user,
          }
        )
        this.dialog = false
        this.dialog2 = false

        this.user = undefined

        this.vehicle.color = ''
        this.vehicle.license_plate = ''
        this.vehicle.model = ''
        this.vehicle.year = null

        this.appointment.date = ''
        this.appointment.services = []
      },
    },
    mounted() {
      this.fetchData()
      this.years
    },
    computed: {
      ...mapGetters({
        getUser: 'user/getUser',
      }),
      years () {
        const year = new Date().getFullYear()
        const years = Array.from({length: year - 1980}, (value, index) => 1981 + index)
        return years
      }
    },
    watch:{
      cpf_input: {
        handler(value) {
          if (value.length === 14) {
            this.login()
          } else {
            this.disabledButton = true
          }
        },
        immediate: true,
      },
    }
  }
</script>
<style scoped>
:root{
  --primary: #064010;
}

.background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url(../assets/background.png);
  background-size: cover;
  height: calc(100vh - 64px) 
}

.btn-main {
  color: var(--primary);
  background-color: white;
}

svg{
  height: 2px;
}

</style>

<template>
  <v-container class="background" fluid>
    <v-card class="text-center rounded-xxl pa-3" width="350" height="400">
      <v-col class="d-flex justify-center">
        <v-img class="d-block flex-grow-0" :width="50" src="../assets/logo.png"></v-img>
      </v-col>
      <v-col class="font-weight-medium mb-6">
        AUTO ELÉTRICA FULLTECH
      </v-col>
      <v-form @submit.prevent="login">
        <v-col class="d-flex flex-column">
          <v-col>
            <v-text-field
              v-mask="'###.###.###-##'"
              placeholder="000.000.000-00"
              v-model="cpf_login"
              class="mb-6"
              label="CPF"
              required
              outlined></v-text-field>
              <v-alert v-if="erro" type="error" class="mt-n9 mb-n3" outlined>
                {{ erro }}
              </v-alert>
          </v-col>
          <v-col class="d-flex justify-space-between">
            <v-btn color="success"  @click.stop="showDialog=true">Cadastrar</v-btn>
            <RegisterScreen v-model="showDialog"/>
            <v-btn color="success" type="submit">Entrar</v-btn>
          </v-col>
        </v-col>
      </v-form>
    </v-card>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'
  import { mapGetters } from 'vuex'
  import RegisterScreen from './RegisterScreen.vue'

  const dialog = shallowRef(false)
</script>

<script>
export default {
  components: {
    RegisterScreen,
  },
  data() {
    return {
      cpf_login: '',
      erro: '',
      showDialog: false,
    }
  },

  methods: {
    async login() {
        if (this.cpf_login !== '') {
          this.erro = ''
          const isLogged = await this.$store.dispatch('auth/login', this.cpf_login)
          if (isLogged) {
            this.$router.push('/main')
          } else {
            this.erro =
              'Esse CPF não existe, por favor cadastre-se!'
          }
        } else {
          this.erro = 'CPF inválido'
        }
      },
  },
  computed: {
    ...mapGetters({
      getUser: 'user/getUser',
    }),
  },
}
</script>
<style scoped>
  .background {
    display: flex;
    justify-content: center;
    align-items: center;
    background-image: url(../assets/background.png);
    background-size: cover;
    height: 100vh
  }
</style>

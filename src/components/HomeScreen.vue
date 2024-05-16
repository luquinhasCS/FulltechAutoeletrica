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
            <v-btn color="success" @click="openModal">Cadastrar</v-btn>
            <v-dialog v-model="showDialog" transition="dialog-bottom-transition" width="400">
              <template>
                <v-card class="text-center pa-6">
                  <v-alert v-if="erro" type="error" outlined>
                    {{ erro }}
                  </v-alert>
                  <v-col class="text-h6">
                    Cadastro de cliente
                    <v-icon class="ml-5" color="black" medium @click="closeModal">mdi-close-circle-outline</v-icon>
                  </v-col>
                  <v-col>
                    <v-text-field v-model="User.nome" required class="mb-2" label="Nome" outlined color="grey"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                      v-mask="'###.###.###-##'"
                      placeholder="000.000.000-00"
                      v-model="User.cpf_cadastro"
                      class="mb-2"
                      label="CPF"
                      outlined
                      required
                      color="grey"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="User.email"
                        class="mb-2"
                        label="E-mail"
                        required
                        outlined
                        color="grey"></v-text-field>
                  </v-col>
                  <v-col>
                    <v-text-field
                        v-model="User.telefone"
                        class="mb-2"
                        v-mask="'(##)#####-####'"
                        label="Telefone"
                        required
                        outlined 
                        color="grey"></v-text-field>
                  </v-col>
                  <v-card-actions class="justify-center w-100">
                    <v-btn large type="submit" color="success" width="90%" @click="addUser">Cadastrar</v-btn>
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
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

  const dialog = shallowRef(false)

</script>

<script>
export default {
  data() {
    return {
      showDialog: false,
      cpf_login: '',
      User: {
          nome: '',
          cpf_cadastro: '',
          email: '',
          telefone: '',
          admin: false,
        },
      erro: '',
    }
  },

  methods: {
    openModal() {
      this.showDialog = true
    },
    closeModal() {
      this.showDialog = false
    },
    async addUser() {
      this.erro = false
      if (this.User.nome === ''){
        this.erro = 'Insira um nome!'
        return
      }
      if (this.User.cpf_cadastro === ''){
        this.erro = 'Insira um CPF!'
        return
      }
      if (this.User.email === ''){
        this.erro = 'Insira um email!'
        return
      }
      if (this.User.telefone === ''){
        this.erro = 'Insira um telefone!'
        return
      }

      const novoUsuario = await this.$store.dispatch(
        'user/addUser',
        this.User
      )
      if(novoUsuario) {
        this.erro = await novoUsuario
        return
      }
      this.showDialog = false
    },
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
  watch: {
    showDialog: function(val) {
      if(val) {
        this.erro = false
        this.User.nome = ''
        this.User.cpf_cadastro = ''
        this.User.telefone = ''
        this.User.email = ''
      }
    }
  }
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

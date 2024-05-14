<template>
  <v-container class="background" fluid>
    <v-card class="text-center rounded-xxl pa-3" width="350" height="400">
      <v-col class="d-flex justify-center">
        <v-img class="d-block flex-grow-0" :width="50" src="../assets/logo.png"></v-img>
      </v-col>
      <v-col class="font-weight-medium mb-6">
        AUTO ELÉTRICA FULLTECH
      </v-col>
      <v-form>
        <v-col class="d-flex flex-column">
          <v-col>
            <v-text-field class="mb-6" label="CPF" outlined></v-text-field>
          </v-col>
          <v-col class="d-flex justify-space-between" >

          <v-dialog transition="dialog-bottom-transition" width="400">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="success" v-bind="attrs" v-on="on">Cadastrar</v-btn>
            </template>
            <template v-slot:default="dialog">
              <v-card class="text-center pa-6">
                <v-col class="text-h6">
                  Cadastro de cliente
                  <v-icon class="ml-5" color="black" medium @click="dialog.value = false">mdi-close-circle-outline</v-icon>
                </v-col>
                <v-col>
                  <v-text-field class="mb-2" label="Nome" outlined></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field class="mb-2" label="CPF" outlined></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field class="mb-2" label="E-mail" outlined></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field class="mb-2" label="Telefone" outlined></v-text-field>
                </v-col>
                
                <v-card-actions class="justify-center w-100">
                  <v-btn large color="success" width="90%" @click="dialog.value = false">Cadastrar</v-btn>
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

<script>
export default {
  data() {
    return {
      servicos: [],
    }
  },
  methods: {
    getServicos() {
      this.$api.Servico.GetAll().then((result) => {
        this.servicos = result
      })
    },
    clear() {
      this.servicos = []
    }
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
  height: 100vh;
}
</style>

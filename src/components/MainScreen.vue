<template>
  <v-container class="background" fluid>
    <v-col class="d-flex justify-center align-center" style="gap: 50px">
      <v-col class="flex-grow-0">
        <v-btn elevation="2" class="btn-main pa-5 px-9" outlined @click="dialog = true">SOLICITAR SERVIÇO</v-btn>
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" width="800">
          <v-card class="pa-2">
            <v-col class="d-flex justify-space-between">
              <v-col class="text-h6 pa-0">Novo Atendimento</v-col>
              <v-icon class="ml-5" color="black" medium @click="dialog.value = false">mdi-close</v-icon>
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
              <v-text-field class="mb-2" style="width: 100% !important" label="CPF" outlined color="grey"></v-text-field>
            </v-col>
          </v-col>
            <v-card-actions class="justify-end">
              <v-btn large color="success" width="30%" @click="dialog2 = true">Continuar</v-btn>
              <v-dialog v-model="dialog2" width="800">
                <v-card class="pa-6">
                  <v-col class="d-flex text-center">
                    <v-card-text class="text-h6 pa-0" style="width: inherit">Ordem de serviço</v-card-text>
                    <v-spacer></v-spacer>
                    <v-icon class="ml-5" color="black" medium @click="dialog.value = false">mdi-close</v-icon>
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
                        <v-text-field label="Modelo do Veículo" outlined color="grey"></v-text-field>
                      </v-col>
                      <v-col cols="4" class="py-0">
                        <v-text-field label="Cor do Veículo" outlined color="grey"></v-text-field>
                      </v-col>
                    </v-col>
                    <v-col class="d-flex">
                      <v-col cols="8" class="py-0">
                        <v-text-field label="Placa do Veículo" outlined color="grey"></v-text-field>
                      </v-col>
                      <v-col cols="4" class="py-0">
                        <v-text-field label="Ano do Veículo" outlined color="grey"></v-text-field>
                      </v-col>
                    </v-col>
                    <v-col class="d-flex">
                      <v-col cols="8" class="py-0">
                        <v-text-field label="Serviços" outlined color="grey"></v-text-field>
                      </v-col>
                      <v-col cols="4" class="py-0">
                        <v-text-field label="Data do Atendimento" outlined color="grey"></v-text-field>
                      </v-col>
                    </v-col>
                    <v-col class="d-flex justify-space-between">
                      <v-btn color="black" class="white--text" @click="dialog2 = false">VOLTAR</v-btn>
                      <v-btn color="success" @click="dialog2 = false">CRIAR ORDEM DE SERVIÇO</v-btn>
                    </v-col>
                </v-card>
              </v-dialog>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-col>
      <v-col class="flex-grow-0">
        <v-btn  elevation="2" class="btn-main pa-5  px-9" outlined>LISTA DE SERVIÇOS</v-btn>
      </v-col>
    </v-col>
  </v-container>
</template>

<script setup>
  import { shallowRef } from 'vue'

  const dialog = shallowRef(false)
  const dialog2 = shallowRef(false)

</script>

<script>
  export default {
    data () {
      return {
        dialog: false,
        dialog2: false
      }
    },
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
  height: 100vh;
}

.btn-main {
  color: var(--primary);
  background-color: white;
}

svg{
  height: 2px;
}

</style>

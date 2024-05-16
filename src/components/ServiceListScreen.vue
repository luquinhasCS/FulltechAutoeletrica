<template>
  <v-container fluid class="mt-6">
  <v-card dark >
    <v-card-title>
      <v-col class="d-flex" style="gap:16px">
        <v-btn color="success" class="botao"><v-icon x-large>mdi-plus-circle</v-icon></v-btn>
        <v-btn color="black" class="botao white--text"><v-icon x-large>mdi-refresh</v-icon></v-btn>
      </v-col>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="servicos"
        class="elevation-1"
      >
        <template v-slot:item.acoes="{ item }">
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
export default {
  data() {
    return {
      headers: [
        { text: 'Veículo', align: 'center', sortable: true, value: 'nome' },
        { text: 'Cor', align: 'center', value: 'valor' },
        { text: 'Placa', align: 'center', value: 'descricao' },
        { text: 'Serviços', align: 'center', value: 'servicos'},
        { text: 'Status', align: 'center', value: 'status' },
        { text: 'Ações', align: 'center', value: 'acoes', sortable: false },
      ],
      servicos: [],
    }
  },
  methods: {
    async fetchData() {
      try {
        this.$api.Servico.GetAll().then((result) => {
          this.servicos = result
        })
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    },
    editItem(item) {
      alert(`Edit ${item.nome}`)
    },
    deleteItem(item) {
      alert(`Delete ${item.name}`)
    },
  },
  mounted() {
    this.fetchData()
  },
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
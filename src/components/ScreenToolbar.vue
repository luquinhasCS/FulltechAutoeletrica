<template>
  <v-toolbar elevation="4" flat class="px-6">
    <router-link to="/main">
      <v-col class="d-flex" style="gap: 16px">
        <v-img class="d-block flex-grow-0" :width="30" src="../assets/logo.png" w></v-img>
        <v-toolbar-title class="black--text font-weight-medium">AUTO ELÉTRICA FULLTECH</v-toolbar-title>
      </v-col>
  </router-link>
    <v-spacer></v-spacer>
    <v-btn icon class="px-16" @click="logout">
      <v-col>{{ this.getUser.admin ? "ADMIN" : this.getUser.nome.split(" ")[0] }}</v-col>
      <v-icon color="black" large>mdi-logout</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    data() {
      return {}
    },
      logout() {
        this.$store.dispatch('auth/logout')
        this.$router.push('/')
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
a {color:transparent;}
</style>

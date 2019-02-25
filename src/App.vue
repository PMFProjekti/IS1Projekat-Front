
<template>
  <v-app class="app">
    <v-toolbar
      app
      class="header content"
    >
      <img src="@/assets/llama.png" alt="Vuetify.js" class="icon">
      <v-toolbar-title class="header-title" v-text="title"></v-toolbar-title>
      <router-link to="/">
        <v-btn class="header-button"> Početna </v-btn>
      </router-link>
      <router-link to="/korisnici/pregled">
        <v-btn class="header-button"> Korisnici </v-btn>
      </router-link>
      <v-spacer></v-spacer>
      <router-link to="/prijava">
        <v-btn class="header-button" right> Prijava </v-btn>
      </router-link>
      <router-link to="/registracija">
        <v-btn class="header-button" right> Registracija </v-btn>
      </router-link>
    </v-toolbar>
    <v-content class="content">
      <router-view/>
    </v-content>
    <v-footer app>
      <span class="footer content">&copy; 2019 Miloš Manojlović & Nikola Dragojlović</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
  .icon {
    width: 40px;
    height: 40px;
  }
  .header {
    background-color:#fcdeb6;
  }
  .header-title {
    font-size: 25px;
    margin-right: 30px;
  }
  .header-button {
    background-color: #FF7F50 !important;
    color: white;
  }
  .footer {
    padding-left: 20px;
  }
</style>

<style>
  .app * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }
  .content {
    width: 70%;
    margin-left: 15%;
  }
  @media (max-width: 1600px) {
    .content {
      width: 86%;
      margin-left: 7%;
    }
  }
  @media (max-width: 1300px) {
    .content {
      width: 100%;
      margin-left: 0%;
    }
  }
  .slim-content {
    width: 40%;
    margin-left: 30%;
  }
  h1, h2 {
    font-weight: normal;
  }
  .divider {
    margin-top: 30px;
    margin-bottom: 30px;
  }
</style>

<script>
export default {
  data () {
    return {
      title: 'Škollama'
    }
  },
  name: 'App'
}
</script>
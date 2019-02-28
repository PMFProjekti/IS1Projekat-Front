<template>
  <v-app class="app">
    <app-header />
    <v-content class="content">
      <router-view/>
    </v-content>
    <v-footer app>
      <span class="footer content">&copy; 2019 Miloš Manojlović & Nikola Dragojlović</span>
    </v-footer>
  </v-app>
</template>

<style scoped>
  .app * {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important;
  }
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
  .link {
    text-decoration: none !important;
  }
  .footer {
    padding-left: 20px;
  }
</style>

<style>
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
import Header from './views/layout/Header';

export default {
  components: {
    'app-header': Header
  },
  data () {
    return {
      title: 'Škollama'
    }
  },
  name: 'App'
}
</script>
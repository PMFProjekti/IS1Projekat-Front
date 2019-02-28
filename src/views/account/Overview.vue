<template>
  <v-container fluid>
    <h1>Svi korisnici</h1>
    <hr class="divider" />
    <v-container class="list">
        <user-card @updateRole='tryUpdateRole' show-role :key="user.email" v-for="user in users" :user="user" />
    </v-container>
  </v-container>
</template>

<style scoped>
    .list {
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
    }
</style>

<script>
import UserCard from './components/UserCard'
import Account from "./Account";

export default {
    mixins: [Account],
    components: {
        'user-card': UserCard
    },
    data () {
        return {
            users: []
        }
    },
    beforeMount() {
        let path = this.$skollama.formPath(this.domain, 'all');
        this.$http.get(path).then(data => { this.users = data.body }, error => console.error(error));
    }
}
</script>
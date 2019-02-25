<template>
  <v-container fluid>
    <h1>Svi korisnici</h1>
    <hr class="divider" />
    <v-container class="list">
        <user-card />
        <user-card />
        <user-card />
        <user-card />
        <user-card />
    </v-container>
  </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
import UserCard from './UserCard'

export default {
    components: {
        'user-card': UserCard
    },
    data () {
        return {
        }
    },
}
</script>
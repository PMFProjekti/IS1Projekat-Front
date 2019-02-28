<template>
    <v-toolbar app class='header content' >
        <img src='@/assets/llama.png' alt='llama' class='icon'>
        <v-toolbar-title class='header-title' v-text='title'></v-toolbar-title>
        <router-link class='link' to='/'>
            <v-btn class='header-button'> Početna </v-btn>
        </router-link>
        <router-link v-if='loggedIn()' class='link' to='/korisnici/pregled'>
            <v-btn class="header-button"> Korisnici </v-btn>
        </router-link>
        <router-link v-if='loggedIn()' class='link' to='/odelenja/pregled'>
            <v-btn class="header-button"> Odeljenja </v-btn>
        </router-link>
        <router-link v-if='loggedIn()' class='link' to='/predmeti/pregled'>
            <v-btn class="header-button"> Predmeti </v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <router-link v-if='!loggedIn()' class='link' to='/prijava'>
            <v-btn class="header-button" right> Prijava </v-btn>
        </router-link>
        <router-link v-if='!loggedIn()' class='link' to='/registracija'>
            <v-btn class="header-button" right> Registracija </v-btn>
        </router-link>
        <v-btn v-if='loggedIn()' @click="logOut" class="header-button" right> Odjava </v-btn>
        <router-link v-if='loggedIn()' class='link profile' to='/profil'>
            <user-menu v-if='loggedIn()' :user='user' />
        </router-link>
    </v-toolbar>
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
    .link {
        text-decoration: none !important;
    }
    .profile {
        color: black;
    }
</style>

<script>
import UserMenu from './components/UserMenu';
import Account from "../account/Account";

export default {
    mixins: [Account],
    components: {
        'user-menu': UserMenu
    },
    data () {
        return {
            title: 'Škollama'
        }
    },
    computed: {
        user() {
            return this.$skollama.user;
        }
    }
}
</script>
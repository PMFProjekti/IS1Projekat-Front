<template>
    <v-container fluid>
        <h1>Sva odelenja</h1>
        <hr class="divider" />
        <v-container class="list">
            <group-card :key="group.name" v-for="group in groups" :group="group" @add='tryAddStudent' @remove='tryRemoveStudent' />
        </v-container>
        <v-layout row>
            <v-spacer />
            <router-link class='link' to='/odelenja/kreiraj'>
                <div class='new-group'>
                    <v-icon class='add-icon' x-large>add_circle</v-icon>
                    <span style='padding-left:10px'>Dodaj novo odeljenje</span>
                </div>
            </router-link>
        </v-layout>
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
    .new-group {
        font-size: 24px;
        display: flex;
        margin-right: 30px;
        border-radius: 15px;
        cursor: pointer;
        padding: 10px;
        color: #444 !important;
        transition: all 0.5s;
    }
    .link {
        text-decoration: none !important;
    }
    .new-group:hover {
        color: black !important;
        background-color: #eee;
    }
    .add-icon {
        color: #444;
    }
    .add-icon:hover {
        color: black !important;
    }
</style>

<script>
import GroupCard from './components/GroupCard'
import Group from "./Group";

export default {
    mixins: [Group],
    components: {
        'group-card': GroupCard
    },
    data () {
        return {
            groups: []
        }
    },
    beforeMount() {
        let path = this.$skollama.formPath(this.domain, 'all');
        this.$http.get(path).then(data => { this.groups = data.body }, error => console.error(error));
    }
}
</script>
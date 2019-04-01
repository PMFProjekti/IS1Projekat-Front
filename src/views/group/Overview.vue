<template>
    <v-container fluid>
        <h1 v-if='$skollama.role.headmaster'>Sva odeljenja</h1>
        <h1 v-else>Moja odeljenja</h1>
        <hr class="divider" />
        <v-container class="list">
            <group-card :key="group.name" v-for="group in shownGroups" :group="group" @add='tryAddStudent' @remove='tryRemoveStudent' @delete='deleteGroup' />
        </v-container>
        <v-layout v-if='$skollama.role.headmaster' row>
            <v-spacer />
            <router-link class='link' to='/odeljenja/kreiraj'>
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
    computed: {
        shownGroups() {
            if(this.$skollama.role.headmaster) {
                return this.groups;
            }
            if(this.connections.length == 0) return [];
            return this.groups.filter(group => !!this.connections.find(con => con.groupId == group.id));
        }
    },
    data () {
        return {
            groups: [],
            connections: []
        }
    },
    beforeMount() {
        if(!(this.$skollama.role.headmaster || this.$skollama.role.professor)) {
            this.$router.push({ path: '/' });
        }
        let path = this.$skollama.formPath(this.domain, 'all');
        this.$http.get(path).then(data => { this.groups = data.body; }, error => console.error(error));
        path = this.$skollama.formPath('lecture', 'all', { professorId: this.$skollama.user.id } );
        this.$http.get(path).then(data => { this.connections = data.body; }, error => console.error(error));
    },
    methods: {
        deleteGroup(group) {
            this.groups.splice(this.groups.indexOf(group), 1);
        }
    }
}
</script>
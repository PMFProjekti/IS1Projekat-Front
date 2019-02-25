<template>
    <v-card class="card">
        <v-layout row>
            <v-img
                contain
                class="avatar"
                src="https://randomuser.me/api/portraits/men/51.jpg"
                aspect-ratio="1"
            ></v-img>
            <v-layout column class="card-body">
                <v-card-title primary-title class="title">
                    <h3 class="headline mb-0">{{user.name}}</h3>
                </v-card-title>
                <h4 class="email">{{user.email}}</h4>
                <v-layout row>
                    <v-flex class="dropdown-parent">
                        <v-select class="dropdown" :value="getRoleName(user.role)" :height="'15px'" :items="roles" solo dense flat />
                    </v-flex>
                    <v-btn style="margin-left: 0px" flat color="orange">Pregledaj</v-btn>
                </v-layout>
            </v-layout>
        </v-layout>
    </v-card>
</template>

<style scoped>
    .card {
        width: 360px;
        margin: 10px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .avatar {
        width: 110px;
        height: 110px;
    }
    .email {
        font-weight: 100;
        padding-left: 20px;
    }
    .card-body {
        width: 100%;
    }
    .title {
        padding-top: 8px;
        padding-bottom: 0px;
    }
    .dropdown-parent {
        margin-left: 10px;
    }
    .dropdown {
        border-width: 0px;
        font-size: 13px;
    }
</style>

<style>
    .v-input {
        height: 15px !important;
    }
</style>

<script>
export default {
    data () {
        return {
            user: {
                name: 'Petar Simonović',
                email: 'petarsimonovic@skollama.rs',
                role: 'unknown'
            },
            roles: [
                'Nedefinisan',
                'Učenik',
                'Profesor',
                'Direktor'
            ],
            roleCodes: [
                'unknown',
                'student',
                'professor',
                'headmaster'
            ]
        }
    },
    methods: {
        getRole(name) {
            return this.roleCodes[this.roles.indexOf(name)];
        },
        getRoleName(role) {
            return this.roles[this.roleCodes.indexOf(role)];
        }
    }
}
</script>
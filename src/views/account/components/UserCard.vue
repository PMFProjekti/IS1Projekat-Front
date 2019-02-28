<template>
    <v-card v-if='!inline' class="card" :class="{ 'small': small }">
        <v-layout row>
            <v-img
                contain
                class="avatar"
                :class="{ 'small': small }"
                :src="user.avatar"
                aspect-ratio="1"
            ></v-img>
            <v-layout column class="card-body">
                <v-card-title :class="{ 'small': small }" primary-title class="title" >
                    <h3 class="headline mb-0" :class="{ 'small': small }">{{user.name}}</h3>
                </v-card-title>
                <h4 class="email" :class="{ 'small': small }">{{user.email}}</h4>
                <v-layout row>
                    <v-flex class="dropdown-parent">
                        <v-select v-if='showRole' @change="updateRole" class="dropdown" :value="getRoleName(user.role)" :height="'15px'" :items="roles" solo dense flat />
                    </v-flex>
                    <v-btn v-if='!small' style="margin-left: 0px" flat color="orange">Pregledaj</v-btn>
                </v-layout>
            </v-layout>
        </v-layout>
        <v-icon @click='$emit("remove")' v-if='removeButton' class='remove'>close_circle</v-icon>
    </v-card>
    
    <v-layout class='inline-card' v-else row>
        <v-img
            contain
            class="avatar inline"
            :src="user.avatar"
            aspect-ratio="1" />
        <v-layout column>
            <h3 class='inline-name'>{{user.name}}</h3>
            <h4 class='inline-email'>{{user.email}}</h4>
        </v-layout>
    </v-layout>
</template>

<style scoped>
    .card {
        cursor: pointer;
        width: 360px;
        margin: 10px;
        margin-left: 5px;
        margin-right: 5px;
        position: relative;
    }
    .card.small {
        width: 240px;
        max-height: 60px !important;
    }
    .avatar {
        width: 110px;
        height: 110px;
    }
    .avatar.small {
        width: 60px;
        height: 60px;
    }
    .avatar.inline {
        width: 40px;
        height: 40px;
    }
    .email {
        font-weight: 100;
        padding-left: 20px;
    }
    .email.small {
        font-size: 12px;
        padding-left: 10px;
    }
    .card-body {
        width: 100%;
    }
    .title {
        padding-top: 8px;
        padding-bottom: 0px;
    }
    .title.small {
        padding-top: 0px;
        padding-left: 5px;
    }
    .headline.small {
        padding-left: 5px;
        font-weight: bold;
        font-size: 16px !important;
    }
    .dropdown-parent {
        margin-left: 10px;
    }
    .dropdown {
        border-width: 0px;
        font-size: 13px;
    }
    .v-input {
        height: 15px !important;
    }
    .inline-name {
        padding-top: 3px;
        font-size: 15px;
        font-weight: 700;
        padding-left: 10px;
        color: black;
    }
    .inline-email {
        font-size: 12px;
        font-style: italic;
        padding-left: 10px;
        color: #555;
    }
    .remove {
        position: absolute;
        right: -165px;
        top: 5px;
    }
</style>

<style>
    
</style>

<script>
export default {
    props: {
        user: {
            type: Object,
            required: true
        },
        showRole: {
            type: Boolean,
            default: false
        },
        inline: {
            type: Boolean,
            default: false
        },
        small: {
            type: Boolean,
            default: false
        },
        removeButton: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
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
        },
        updateRole(roleName) {
            this.$emit('updateRole', { email: this.user.email, role: this.getRole(roleName) } );
        }
    }
}
</script>
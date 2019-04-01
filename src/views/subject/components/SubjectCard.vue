<template>
   <v-card class="card">
        <v-layout class="header" row>
            <div class='name'>{{subject.name}}</div>
            <div class='year'>Godina: {{subject.year}}</div>
            <v-spacer />
            <router-link class='link' :to='"/predmeti/izmeni/"+subject.id'>
                <v-btn v-if='!lecture' class='button'>Izmeni</v-btn>
            </router-link>
            <v-btn @click='deleteSubject' v-if='!lecture' class='button'>Obriši</v-btn>
            <user-selector
                class='professor-select'
                v-if='lecture'
                displaySelection
                :users='professors'
                :value='subject.professor'
                @select='connect'
                placeholder='Izaberi profesora' />
        </v-layout>
    </v-card>
</template>

<style scoped>
    .card {
        width: 100%;
        height: 75px;
        margin-bottom: 20px;
    }
    .name {
        font-size: 32px;
        font-weight: 400;
        padding-top: 10px;
        padding-left: 40px;
        padding-right: 40px;
    }
    .year {
        font-size: 24px;
        font-style: italic;
        padding-top: 20px;
    }
    .button {
        margin-top: 18px;
        margin-right: 20px;
    }
    .professor-select {
        margin-top: 10px;
        max-width: 300px;
    }
    .link {
        text-decoration: none !important;
    }
</style>

<script>
import UserSelector from '../../account/components/UserSelector';

export default {
    components: {
        'user-selector': UserSelector
    },
    props: {
        subject: {
            type: Object,
            required: true
        },
        lecture: {
            type: Boolean,
            default: false
        },
        professors: {
            required: false
        }
    },
    data() {
        return {
        }
    },
    methods: {
        connect(professor) {
            let connection = {
                professorId: professor.id,
                subjectId: this.subject.id
            }
            this.$emit('connect', connection);
        },
        deleteSubject() {
            this.$emit('delete', this.subject);
            let path = this.$skollama.formPath('subject', 'delete', { id: this.subject.id});
            this.$http.get(path).then(() => {}, error => console.error(error));
        }
    }
}
</script>
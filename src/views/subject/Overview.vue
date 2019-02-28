<template>
    <v-container fluid>
        <h1>Svi predmeti</h1>
        <hr class="divider" />
        <subject-card v-for='subject of subjects' :key='subject.id' :subject='subject' />
        <v-layout row>
            <v-spacer />
            <router-link class='link' to='/predmeti/kreiraj'>
                <div class='new-subject'>
                    <v-icon class='add-icon' x-large>add_circle</v-icon>
                    <span style='padding-left:10px'>Dodaj novi predmet</span>
                </div>
            </router-link>
        </v-layout>
    </v-container>
</template>

<style scoped>
    .new-subject {
        font-size: 24px;
        display: flex;
        margin-right: 30px;
        border-radius: 15px;
        cursor: pointer;
        padding: 10px;
        color: #444 !important;
        transition: all 0.5s;
    }
    .new-subject:hover {
        color: black !important;
        background-color: #eee;
    }
    .add-icon {
        color: #444;
    }
    .add-icon:hover {
        color: black !important;
    }
    .link {
        text-decoration: none !important;
    }
</style>

<script>
import Subject from "./Subject";
import SubjectCard from './components/SubjectCard'

export default {
    mixins: [Subject],
    components: {
        'subject-card': SubjectCard
    },
    data () {
        return {
            subjects: []
        }
    },
    beforeMount() {
        let path = this.$skollama.formPath(this.domain, 'all');
        this.$http.get(path).then(data => { this.subjects = data.body }, error => console.error(error));
    }
}
</script>
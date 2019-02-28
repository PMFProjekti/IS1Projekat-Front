<template>
    <v-container fluid>
        <h1>Dodeljivanje profesora</h1>
        <hr class="divider" />
        <subject-card v-for='subject of subjects' :key='subject.id' :subject='subject' />
    </v-container>
</template>

<style scoped>
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
            groupId: null,
            group: null,
            subjects: []
        }
    },
    beforeMount() {
        this.groupId = this.$route.params.groupId;
        let path = this.$skollama.formPath('group', 'find', { id: this.groupId });
        this.$http.get(path).then(data => { 
            this.group = data.body;
            let path = this.$skollama.formPath(this.domain, 'all', { year: this.group.year });
            this.$http.get(path).then(data => {
                this.subjects = data.body; 
            },
            error => console.error(error));
        },
        error => console.error(error));
    }
}
</script>
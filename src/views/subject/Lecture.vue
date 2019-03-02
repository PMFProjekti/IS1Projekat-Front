<template>
    <v-container fluid>
        <h1>Dodeljivanje profesora</h1>
        <hr class="divider" />
        <subject-card
            lecture
            :professors='professors'
            v-for='subject of connectedSubjects'
            :key='subject.id'
            :subject='subject'
            @connect='connect'/>
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
    computed: {
        connectedSubjects() {
            return this.subjects.map(subject => {
                let connectedSubject = {...subject};
                let connection = this.connections.find(con => con.subjectId == subject.id);
                if(connection) {
                    let professor = this.professors.find(prof => prof.id == connection.professorId);
                    if(professor) {
                        connectedSubject.professor = professor;
                    }
                }
                return connectedSubject;
            });
        }
    },
    data () {
        return {
            groupId: null,
            group: null,
            subjects: [],
            professors: [],
            connections: []
        }
    },
    beforeMount() {
        if(!this.$skollama.role.headmaster) {
            this.$router.push({ path: '/' });
        }
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
        path = this.$skollama.formPath('lecture', 'all', { groupId: this.groupId } );
        this.$http.get(path).then(data => { this.connections = data.body; }, error => console.error(error));
        path = this.$skollama.formPath('account', 'all', { role: 'professor' } );
        this.$http.get(path).then(data => { this.professors = data.body; }, error => console.error(error));
    },
    methods: {
        connect(connection) {
            connection.groupId = this.groupId;
            let path = this.$skollama.formPath('lecture', 'connect');
            this.$http.post(path, connection).then(data => {  }, error => console.error(error));
        }
    }
}
</script>
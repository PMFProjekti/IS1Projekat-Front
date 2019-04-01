<template>
    <v-container fluid>
        <h1>Učenikovi podaci</h1>
        <hr class="divider" />
        <v-layout row>
            <h2 class='student-label'>Učenik: </h2>
            <user-card v-if='student' small :user='student' />
        </v-layout>
        <v-card v-if='grades && subjects' class="offset">
            <h2 class='title'>Ocene</h2>
            <hr class="divider small" />
            <v-layout class='grades' column>
                <grade-card @change='gradesChanged' v-for='grade in grades.grades' :key='grade.subjectId' :studentId='studentId' :subjectGrades='grade' :subjects='subjects' />
            </v-layout>
        </v-card>
        <v-card v-if='grades' class="offset">
            <h2 class='title'>Izostanci</h2>
            <hr class="divider small" />
            <v-layout class='grades' column>
                <div v-for='absence in grades.absences' class='absence'><span>{{absence.date.toDateString()}} - {{absence.class}}. čas </span>
                    <v-checkbox
                        :readonly='!mentor'
                        v-model='absence.pardoned'
                        @change='gradesChanged'
                        :label="`Opravdan`"
                    ></v-checkbox>
                </div>
            </v-layout>
            <v-layout v-if='newAbsence' row class='new-absence-input'>
                <span style='font-size: 20px; padding-top: 8px; margin-right: 8px; margin-left:10px'>Čas:</span>
                <v-select
                    class='class-picker'
                    v-model='newAbsence.class'
                    :items="[1,2,3,4,5,6,7,8]"
                    label="Čas"
                    solo
                ></v-select>
            </v-layout>
            <div @click='addNewAbsence' class='new-absence'>
                <v-icon class='add-icon'>add_circle</v-icon>
                <span style='padding-left:10px'>Dodaj izostanak</span>
            </div>
            
        </v-card>
    </v-container>
</template>

<style scoped>
    .title {
        padding: 20px;
    }
    .student-label {
        font-size: 24px;
        padding-top: 20px;
        padding-left: 20px;
        padding-right: 10px;
    }
    .grades {
        padding: 20px;
    }
    .divider.small {
        margin-top: 0px;
        margin-bottom: 0px;
    }
    .absence {
        font-size: 16px;
    }
    .offset {
        margin-top: 30px;
    }
    .new-absence {
        padding: 10px;
        display: flex;
        cursor: pointer;
    }
    .add-icon {
        cursor: pointer;
    }
    .new-absence-input {
        padding: 10px;
    }
    .class-picker {
        max-width: 60px !important;
        margin-right: 10px;
    }
</style>

<script>
import GradeCard from './components/GradeCard'
import UserCard from '../account/components/UserCard'

export default {
    components: {
        'user-card': UserCard,
        'grade-card': GradeCard
    },
    computed: {
    },
    data () {
        return {
            studentId: null,
            student: null,
            subjects: null,
            grades: null,
            mentor: false,
            newAbsence: null
        }
    },
    beforeMount() {
        this.studentId = this.$route.params.studentId;
        let path = this.$skollama.formPath('account', 'find', { id: this.studentId });
        this.$http.get(path).then(data => this.student = data.body, error => console.error(error));
        path = this.$skollama.formPath('grades', 'all', { studentId: this.studentId });
        this.$http.get(path).then(data => {
            this.grades = data.body;
            for(let i in this.grades.absences) {
                this.grades.absences[i].date = new Date(this.grades.absences[i].date);
            }
        }, error => console.error(error));
        path = this.$skollama.formPath('subject', 'all', { studentId: this.studentId });
        this.$http.get(path).then(data => this.subjects = data.body, error => console.error(error));
        path = this.$skollama.formPath('group', 'mentor', { studentId: this.studentId });
        this.$http.get(path).then(data => {
            this.mentor = this.$skollama.user.id == data.body.mentor;
        }, error => console.error(error));
    },
    methods: {
        addNewAbsence() {
            if(!this.newAbsence) {
                this.newAbsence = {
                    class: 1,
                    date: new Date(),
                    pardoned: false
                }
            }
            else {
                this.grades.absences.push(this.newAbsence);
                this.gradesChanged();
                this.newAbsence = null;
            }
        },
        gradesChanged() {
            let path = this.$skollama.formPath('grades', 'update');
            this.$http.post(path, this.grades).then(() => {}, error => console.error(error));
        }
    }
}
</script>
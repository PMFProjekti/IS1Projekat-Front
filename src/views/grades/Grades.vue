<template>
    <v-container fluid>
        <h1>Učenikovi podaci</h1>
        <hr class="divider" />
        <v-layout row>
            <h2 class='student-label'>Učenik: </h2>
            <user-card v-if='student' small :user='student' />
        </v-layout>
        <v-card class="offset">
            <h2 class='title'>Ocene</h2>
            <hr class="divider small" />
            <v-layout class='grades' column>
                <grade-card v-for='grade in grades.grades' :key='grade.id' :subjectGrades='grade' :subject='grade.subject' />
            </v-layout>
        </v-card>
        <v-card class="offset">
            <h2 class='title'>Izostanci</h2>
            <hr class="divider small" />
            <v-layout class='grades' column>
                <div class='absence'><span>27. Februar 2019. - 4. čas </span>
                    <v-checkbox
                        readonly
                        :value='true'
                        :label="`Opravdan`"
                    ></v-checkbox>
                </div>
                <div class='absence'><span>27. Februar 2019. - 5. čas </span>
                    <v-checkbox
                        readonly
                        :value='false'
                        :label="`Opravdan`"
                    ></v-checkbox>
                </div>
            </v-layout>
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
            grades: {
                grades: [
                    {
                        id: 0,
                        subject: {
                            name: 'Matematika 3'
                        },
                        values: [5, 4, 5, 5],
                        locked: 5
                    },
                    {
                        id: 1,
                        subject: {
                            name: 'Digitalna Elektronika'
                        },
                        values: [3, 5, 5],
                        locked: 0,
                        allowed: true
                    }
                ]
            }
        }
    },
    beforeMount() {
        this.studentId = this.$route.params.studentId;
        let path = this.$skollama.formPath('account', 'find', { id: this.studentId });
        this.$http.get(path).then(data => this.student = data.body, error => console.error(error));
        //path = this.$skollama.formPath('grades', 'all', { studentId: this.studentId });
        //this.$http.get(path).then(data => this.grades = data.body, error => console.error(error));
    },
    methods: {
    }
}
</script>
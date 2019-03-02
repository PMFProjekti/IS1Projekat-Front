<template>
   <v-card class="card">
        <v-layout column>
            <v-layout class="header" row>
                <div class='name'>{{group.name}}</div>
                <div class='year'>Godina: {{group.year}}</div>
                <v-spacer />
                <user-card small class='mentor' v-if="!!group.mentor" :user="group.mentor" />
            </v-layout>
            <hr />
            <div class="students">
                <v-container class="list">
                    <user-card @click='selectStudent' :removeButton='$skollama.role.headmaster' @remove='remove(student)' small v-for='student in group.students' :key='student.email' :user='student' />
                </v-container>
                <v-layout v-if='$skollama.role.headmaster' style="padding-top: 10px" row>
                    <v-btn>Obriši</v-btn>
                    <router-link class='link' :to='"/predmeti/predavanja/" + this.group.id'>
                        <v-btn>Dodeli profesore</v-btn>
                    </router-link>
                    <v-spacer />
                    <v-layout class='new-student-select' row>
                        <v-icon class='add-student-icon'>add_circle</v-icon>
                        <user-selector :users='filteredStudents' @select='add' />
                    </v-layout>
                </v-layout>
            </div>
        </v-layout>
    </v-card>
</template>

<style scoped>
    .card {
        width: 100%;
        margin-bottom: 20px;
    }
    .name {
        font-size: 48px;
        font-weight: 400;
        padding-top: 20px;
        padding-left: 40px;
        padding-right: 40px;
    }
    .year {
        font-size: 24px;
        font-style: italic;
        padding-top: 38px;
    }
    .mentor {
        margin-top: 30px !important;
        margin-right: 30px !important;
    }
    .students {
        padding: 30px;
    }
    .add-student {
        font-size: 18px;
        height: 110px;
        width: 360px;
        padding-top: 30px;
        cursor: pointer;
        transition: background 0.5s;
        text-align: center;
        background-color: white;
    }
    .add-student-icon {
        color: black;
    }
    .new-student-select {
        max-width: 300px;
        height: 50px;
        margin-left: 10%;
    }
    .header {
        height: 120px;
    }
    .list {
        margin: 0px;
        padding: 0px;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: left;
    }
    .link {
        text-decoration: none !important;
    }
</style>

<script>
import UserCard from '../../account/components/UserCard';
import UserSelector from '../../account/components/UserSelector';

export default {
    props: ['group'],
    components: {
        'user-card': UserCard,
        'user-selector': UserSelector
    },
    computed: {
        filteredStudents() {
            return this.students.filter(student => {
                for(let i in this.group.students) {
                    if(this.group.students[i].id == student.id) return false;
                }
                return true;
            });
        }
    },
    data() {
        return {
            mentor: null,
            students: [],
            selectedStudent: { }
        }
    },
    beforeMount() {
        let path = this.$skollama.formPath('account', 'all', { role: 'student' } );
        this.$http.get(path).then(data => { this.students = data.body; }, error => console.error(error));
    },
    methods: {
        add(student) {
            this.group.students.push(student);
            this.$emit('add', { studentId: student.id, groupId: this.group.id } );
        },
        remove(student) {
            this.group.students.splice(this.group.students.indexOf(student), 1);
            this.$emit('remove', { studentId: student.id, groupId: this.group.id } );
        },
        selectStudent(student) {
            this.$router.push({ path:'/ocene/'+student.id });
        }
    }
}
</script>
<template>
   <v-card class="card">
        <v-layout class="header" row>
            <div class='name'>{{subject.name}}</div>
            <div class='grades' :class='{ "allowed" : allowed }'>
                <v-chip @input='remove(index)' :value="true" class='chip' v-for='(value, index) in subjectGrades.values' :key='value'
                :close='allowed && !subjectGrades.locked'>{{value}}</v-chip>
                <v-chip v-if='allowed && !subjectGrades.locked' class='chip new'>
                    <v-text-field
                        solo
                        v-if='newStarted'
                        v-model="newGradeValue"
                        :rules="[rules.grade]"
                        class='new-grade'
                        label="Ocena"/>
                    <v-icon @click="newGrade">add</v-icon>
                </v-chip>
            </div>
            <div class='final-grade-panel'>
                <div class='final' :class='{ "final-locked" : subjectGrades.locked != 0 }'>
                    <h1 class='final-grade'>{{final}}</h1>
                </div>
                <v-icon @click='lock' class='final-lock' v-if='subjectGrades.locked == 0'>lock_open</v-icon>
                <v-icon @click='lock' class='final-lock locked' v-else>lock</v-icon>
            </div>
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
        width: 400px;
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
    .grades {
        margin-top: 8px;
        padding: 10px;
        width: 768px;
        border-radius: 10px;
        background-color: #eee;
    }
    .chip {
        background-color: white;
        font-size: 16px;
    }
    .final {
        position: absolute;
        padding: 12px;
    }
    .final-grade {
        padding-left: 10px;
        padding-right: 2px;
    }
    .final-lock {
        cursor: pointer;
        position: absolute;
        top: 22px;
        right: 15px;
    }
    .final-lock.locked {
        color: red;
    }
    .allowed {
        background-color: #fcdeb6 !important;
    }
    .new {
        cursor: pointer;
    }
    .new-grade {
        width: 35px;
    }
    .final-grade-panel {
        position: relative;
        width: 100px;
    }
</style>

<script>
import UserSelector from '../../account/components/UserSelector';

export default {
    components: {
        'user-selector': UserSelector
    },
    computed: {
        final() {
            if(this.subjectGrades.locked != 0) return this.subjectGrades.locked;
            if(this.subjectGrades.values.length == 0) return " ";
            let median = 0;
            for(let i in this.subjectGrades.values) {
                median += this.subjectGrades.values[i];
            }
            median /= this.subjectGrades.values.length;
            return Math.round(median);
        },
        subject() {
            return this.subjects.find(subject => subject.id == this.subjectGrades.subjectId);
        }
    },
    props: {
        studentId: {
            type: String,
            required: true
        },
        subjects: {
            type: Array,
            required: true
        },
        subjectGrades: {
            type: Object,
            required: true
        }
    },
    mounted() {

        let path = this.$skollama.formPath('lecture', 'access', { studentId: this.studentId, professorId: this.$skollama.user.id, subjectId: this.subject.id });
        this.$http.get(path).then(data => this.allowed = data.body.allowed, error => console.error(error));
    },
    data() {
        return {
            newStarted: false,
            newGradeValue: 5,
            allowed: false,
            rules: {
                grade: value => typeof value == 'number' && value > 0 && value < 6
            }
        }
    },
    methods: {
        newGrade() {
            if(!this.allowed) return;
            if(!this.newStarted) this.newStarted = true;
            else {
                this.subjectGrades.values.push(parseInt(this.newGradeValue, 10));
                this.$emit('change');
                this.newStarted = false;
            }
        },
        remove(index) {
            this.subjectGrades.values.splice(index, 1);
        },
        lock() {
            if(this.subjectGrades.locked != 0){
                this.subjectGrades.locked = 0;
                this.$emit('change');
            }
            else if(this.subjectGrades.values.length > 0)
            {
                this.subjectGrades.locked = this.final; 
                this.$emit('change');
            }
        }
    }
}
</script>
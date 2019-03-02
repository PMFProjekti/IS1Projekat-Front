<template>
   <v-card class="card">
        <v-layout class="header" row>
            <div class='name'>{{subject.name}}</div>
            <div class='grades' :class='{ "allowed" : subjectGrades.allowed }'>
                <v-chip class='chip' v-for='value in subjectGrades.values' :key='value' close>{{value}}</v-chip>
                <v-chip class='chip'>+</v-chip>
            </div>
            <div class='final' :class='{ "final-locked" : subjectGrades.locked != 0 }'>
                <h1 class='final-grade'>{{final}}</h1>
                
            </div>
            <v-icon v-if='subjectGrades.locked == 0'>lock_open</v-icon>
            <v-icon class='final-locked' v-else>lock</v-icon>
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
        padding: 12px;
    }
    .final-grade {
        padding-left: 10px;
        padding-right: 2px;
    }
    .final-locked {
        color: red;
    }
    .allowed {
        background-color: #fcdeb6;
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
            let median = 0;
            for(let i in this.subjectGrades.values) {
                median += this.subjectGrades.values[i];
            }
            median /= this.subjectGrades.values.length;
            return Math.round(median);
        }
    },
    props: {
        subject: {
            type: Object,
            required: true
        },
        subjectGrades: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
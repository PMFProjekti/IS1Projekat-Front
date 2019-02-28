<template>
   <v-card class="card">
        <v-layout class="header" row>
            <div class='name'>{{subject.name}}</div>
            <div class='year'>Godina: {{subject.year}}</div>
            <v-spacer />
            <v-btn class='button'>Izmeni</v-btn>
            <v-btn class='button'>Obriši</v-btn>
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
</style>

<script>

export default {
    props: ['subject'],
    data() {
        return {
        }
    },
    methods: {
    }
}
</script>
<template>
    <v-container fluid class="slim-content">
        <v-layout column>
            <h1>Kreiranje predmeta</h1>
            <hr class="divider" />
            <label class="label">Naziv</label>
            <v-text-field
                solo
                v-model="name"
                :rules="[rules.required]"
                label="Naziv"/>
            <label class="label">Godina</label>
            <div class='year-container'>
                <v-text-field
                solo
                readonly
                class='year'
                v-model="year"
                type="text"
                label="Number"
                append-outer-icon="add"
                @click:append-outer="increment"
                prepend-icon="remove"
                @click:prepend="decrement" />
            </div>
        </v-layout>
        <v-btn @click='tryCreate' class="prijava">Kreiraj</v-btn>
    </v-container>
</template>

<style scoped>
    .prijava {
        color: white;
        background-color: #FF7F50 !important;
        margin-left: 20%;
        width: 60%;
    }
    .label {
        font-size: 10px;
        font-style: italic;
        padding-left: 10px;
    }
    .year-container {
        display: flex;
        justify-content: center;
    }
    .year {
        text-align: center;
        max-width: 200px;
    }
</style>

<script>
import Subject from "./Subject";

export default {
    mixins: [Subject],
    data () {
        return {
        }
    },
    methods: {
        increment () {
            this.year = parseInt(this.year,10) + 1
            if(this.year > 8) this.year = 8;
        },
        decrement () {
            this.year = parseInt(this.year,10) - 1
            if(this.year < 1) this.year = 1;
        }
    },
    beforeMount() {
        if(!this.$skollama.role.headmaster) {
            this.$router.push({ path: '/' });
        }
    }
}
</script>
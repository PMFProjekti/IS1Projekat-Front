<template>
    <v-container v-if='subject' fluid class="slim-content">
        <v-layout column>
            <h1>Izmena predmeta</h1>
            <hr class="divider" />
            <label class="label">Naziv</label>
            <v-text-field
                solo
                v-model="subject.name"
                :rules="[rules.required]"
                label="Naziv"/>
            <label class="label">Godina</label>
            <div class='year-container'>
                <v-text-field
                solo
                readonly
                class='year'
                v-model="subject.year"
                type="text"
                label="Number"
                append-outer-icon="add"
                @click:append-outer="increment"
                prepend-icon="remove"
                @click:prepend="decrement" />
            </div>
        </v-layout>
        <v-btn @click='update' class="prijava">Izmeni</v-btn>
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
            subjectId: null,
            subject: null
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
        },
        update() {
            let path = this.$skollama.formPath('subject', 'update');
            this.$http.post(path, this.subject).then(() => { this.$router.push({ path: '/predmeti/pregled' }); }, error => console.error(error));
        }
    },
    beforeMount() {
        if(!this.$skollama.role.headmaster) {
            this.$router.push({ path: '/' });
        }
        this.subjectId = this.$route.params.subjectId;
        let path = this.$skollama.formPath('subject', 'find', { id: this.subjectId});
        this.$http.get(path).then(data => this.subject = data.body, error => console.error(error));
    }
}
</script>
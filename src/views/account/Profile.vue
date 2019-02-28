<template>
    <v-container fluid class="slim-content">
        <h1>Izmena Profila</h1>
        <hr class="divider" />
        <label class="label">Ime i Prezime</label>
        <v-text-field
            solo
            v-model="name"
            :rules="[rules.required]"
            label="Ime"/>
        <label class="label">Email</label>
        <v-text-field
            solo
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"/>
        <v-layout row>
            <img class="picture" :src="picture" />
            <div class="picture-data">
                <label class="label">Slika</label>
                <v-text-field
                    solo
                    v-model="picture"
                    label="Slika"/>
            </div>
        </v-layout>
        <div class="gender">
            <label class="label">Pol</label>
            <v-radio-group class="gender-input" v-model="gender" :mandatory="false">
                <v-radio label="Muški" value="male"></v-radio>
                <v-radio label="Ženski" value="female"></v-radio>
            </v-radio-group>
        </div>
        <v-btn @click='tryUpdate' class="prijava">Ažuriraj Profil</v-btn>
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
    .picture {
        width: 120px;
        height: 120px;
    }
    .picture-data {
        padding-top: 15px;
        padding-left: 20px;
        width: 100%;
    }
    .gender {
        margin-top: 30px;
    }
    .gender-input {
        margin-top: 0px;
    }
</style>

<script>
import Account from "./Account";

export default {
    mixins: [Account],
    data () {
        return {
        }
    },
    mounted() {
        this.name = this.user.name;
        this.email = this.user.email;
        this.picture = this.user.avatar;
        this.gender = this.user.gender;
    }
}
</script>
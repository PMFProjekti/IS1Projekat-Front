<template>
    <v-container fluid class="slim-content">
        <h1>Registracija</h1>
        <hr class="divider" />
        <v-text-field
            solo
            v-model="name"
            :rules="[rules.required]"
            label="Ime"/>
        <v-text-field
            solo
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"/>
        <v-text-field
            solo
            v-model="password"
            :append-icon="(showPassword) ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Šifra"
            hint="Šifra mora biti dugačka makar 8 karaktera"
            counter
            @click:append="showPassword = !showPassword" />
        <v-text-field
            solo
            v-model="passwordRepeat"
            :append-icon="(showPassword) ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Ponovi šifru"
            hint="Šifra mora biti dugačka makar 8 karaktera"
            counter
            @click:append="showPassword = !showPassword" />
        <v-btn @click='trySignUp' class="prijava">Registruj Se</v-btn>
    </v-container>
</template>

<style scoped>
    .prijava {
        color: white;
        background-color: #FF7F50 !important;
        margin-left: 20%;
        width: 60%;
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
}
</script>
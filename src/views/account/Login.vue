<template>
    <v-container fluid class="slim-content">
        <h1>Prijava</h1>
        <hr class="divider" />
        <v-text-field
            solo
            v-model="email"
            :rules="[rules.required, rules.email]"
            label="Email"/>
        <v-text-field
            solo
            v-model="password"
            :append-icon="showPassword ? 'visibility_off' : 'visibility'"
            :rules="[rules.required, rules.min]"
            :type="showPassword ? 'text' : 'password'"
            label="Šifra"
            hint="Šifra mora biti dugačka makar 8 karaktera"
            counter
            @click:append="showPassword = !showPassword" />
        <v-btn @click="tryLogIn" class="prijava">Prijavi Se</v-btn>
    </v-container>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
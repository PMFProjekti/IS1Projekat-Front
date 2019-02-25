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
        <v-btn class="prijava">Prijavi Se</v-btn>
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

export default {
    data () {
        return {
            email: "",
            password: "",
            showPassword: false,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 8 || 'Min 8 characters',
                counter: value => value.length <= 20 || 'Max 20 characters',
                email: value => {
                    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    return pattern.test(value) || 'Invalid e-mail.'
                }
            }
        }
    },
}
</script>
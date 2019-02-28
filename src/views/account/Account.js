export default {
    data () {
        return {
            domain: 'account',
            name: '',
            email: '',
            showPassword: false,
            password: '',
            passwordRepeat: '',
            picture: '',
            gender: '',
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
    computed: {
        user() {
            return this.$skollama.user;
        }
    },
    methods: {
        tryLogIn() {
            let body = {
                email: this.email,
                password: this.password
            }
            let path = this.$skollama.formPath(this.domain,'login',body);
            this.$http.post(path).then(data => { this.logIn(data.body) }, error => console.error(error));
        },
        trySignUp() {
            let body = {
                name: this.name,
                email: this.email,
                password: this.password,
                confirmPassword: this.passwordRepeat
            }
            let path = this.$skollama.formPath(this.domain,'signup');
            this.$http.post(path, body).then(data => { this.logIn(data.body) }, error => console.error(error));
        },
        tryUpdate() {
            let body = {
                name: this.name,
                email: this.email,
                picture: this.picture,
                gender: this.gender
            }
            let path = this.$skollama.formPath(this.domain,'update');
            this.$http.post(path, body).then(data => { this.update(data.body) }, error => console.error(error));
        },
        tryUpdateRole(body) {
            let path = this.$skollama.formPath(this.domain,'role');
            this.$http.post(path, body).then(data => { }, error => console.error(error));
        },
        logIn(user) {
            this.update(user);
            this.$router.push({ path: '/' });
            this.$router.go();
        },
        logOut() {
            this.$skollama.user = null;
            localStorage.removeItem('user');
            this.$router.push({ path: '/' });
            this.$forceUpdate();
        },
        update(user) {
            this.$skollama.user = { email: this.email, ...user };
            localStorage.setItem('user', JSON.stringify(this.$skollama.user));
        },
        loggedIn() {
            return this.$skollama.user != null;
        }
    }
}
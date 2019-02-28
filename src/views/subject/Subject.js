export default {
    data () {
        return {
            domain: 'subject',
            year: 1,
            name: '',
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 6 || 'Min 6 characters'
            }
        }
    },
    methods: {
        tryCreate() {
            let body = {
                name: this.name,
                year: this.year,
            }
            let path = this.$skollama.formPath(this.domain,'create');
            this.$http.post(path, body).then(data => { this.$router.push({ path: '/' }); }, error => console.error(error));
        }
    }
}
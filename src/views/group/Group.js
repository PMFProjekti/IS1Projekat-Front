export default {
    data () {
        return {
            domain: 'group',
            year: 1,
            name: '',
            mentorId: null,
            rules: {
                required: value => !!value || 'Required.',
                min: v => v.length >= 2 || 'Min 2 characters'
            }
        }
    },
    computed: {
        user() {
            return this.$skollama.user;
        }
    },
    methods: {
        tryCreate() {
            if(this.mentorId == null) return;
            let body = {
                name: this.name,
                year: this.year,
                mentor: this.mentorId
            }
            let path = this.$skollama.formPath(this.domain,'create');
            this.$http.post(path, body).then(data => { this.$router.push({ path: '/' }); }, error => console.error(error));
        },
        tryAddStudent(params) {
            this.tryPutStudent('add', params);
        },
        tryRemoveStudent(params) {
            this.tryPutStudent('remove', params);
        },
        tryPutStudent(route, { studentId, groupId }) {
            let body = {
                studentId,
                groupId
            }
            let path = this.$skollama.formPath(this.domain,route);
            this.$http.put(path, body).then(data => { }, error => console.error(error));
        }
    }
}
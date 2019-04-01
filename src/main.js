import Vue from 'vue'
import App from './App'
import router from './router'

import Vuetify from 'vuetify'
import VueResource from 'vue-resource';
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify)
Vue.use(VueResource)

Vue.config.productionTip = false

let user = JSON.parse(localStorage.getItem('user'));

Vue.prototype.$skollama = {
    user: user,
    token: null,
    api: {
        path:'http://localhost:3000/',
        routes: {
            account:'account',
            group:'group',
            subject: 'subject',
            lecture: 'lecture',
            grades: 'grades'
        }
    },
    role: {
        student: user && user.role === 'student',
        professor: user && user.role === 'professor',
        headmaster: user && user.role === 'headmaster'
    },
    formPath(route, additionalRoute, body) {
        let path = this.api.path;
        path += this.api.routes[route] + '/';
        path += additionalRoute;
        if(!!body) {
            path += '?';
            for(let key in body) {
                path += '&';
                path += key;
                path += '=' + body[key];
            }
            path.replace('?&', '&');
        }
        return path;
    }
};

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
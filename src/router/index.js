import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Login from '@/components/auth/Login'
import Register from '@/components/auth/Register'
import UserOverview from '@/components/UserOverview'

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/prijava',
            name: 'Login',
            component: Login
        },
        {
            path: '/registracija',
            name: 'Register',
            component: Register
        },
        {
            path: '/korisnici/pregled/',
            name: 'UserOverview',
            component: UserOverview
        }
    ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/account/Login'
import Register from '@/views/account/Register'
import Profile from '@/views/account/Profile'
import Overview from '@/views/account/Overview'
import GroupCreate from '@/views/group/Create';
import GroupOverview from '@/views/group/Overview'
import SubjectCreate from '@/views/subject/Create'
import SubjectOverview from '@/views/subject/Overview'
import SubjectLecture from '@/views/subject/Lecture'

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
            path: '/profil',
            name: 'Profile',
            component: Profile
        },
        {
            path: '/korisnici/pregled/',
            name: 'AccountsOverview',
            component: Overview
        },
        {
            path: '/odelenja/kreiraj/',
            name: 'GroupCreate',
            component: GroupCreate
        },
        {
            path: '/odelenja/pregled/',
            name: 'GroupOverview',
            component: GroupOverview
        },
        {
            path: '/predmeti/kreiraj/',
            name: 'SubjectCreate',
            component: SubjectCreate
        },
        {
            path: '/predmeti/pregled/',
            name: 'SubjectOverview',
            component: SubjectOverview
        },
        {
            path: '/predmeti/predavanja/:groupId',
            name: 'SubjectLecture',
            component: SubjectLecture
        }
    ]
})

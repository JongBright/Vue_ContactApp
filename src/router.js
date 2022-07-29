import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Contacts from './components/Contacts.vue'
import UpdateContact from './components/UpdateContact.vue'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        { path: '/', component: Home },
        { path: '/register', component: Register },
        { path: '/login', component: Login },
        { path: '/contacts', component: Contacts },
        { path: '/edit-contact', component: UpdateContact }
    ]
})
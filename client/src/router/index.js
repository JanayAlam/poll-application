import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';
import ResetPassword from '../pages/auth/ResetPassword.vue';
import NotFound from '../pages/errors/NotFound.vue';
import Home from '../pages/Home.vue';

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter: (_to, from) => {
            if (!!localStorage.getItem('token')) {
                return { name: from.name};
            }
            return true;
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: (_to, from) => {
            if (!!localStorage.getItem('token')) {
                return { name: from.name};
            }
            return true;
        },
    },
    {
        path: '/reset-password/u/:userId/t/:token',
        name: 'reset-password',
        component: ResetPassword,
        beforeEnter: (_to, from) => {
            if (!!localStorage.getItem('token')) {
                return { name: from.name};
            }
            return true;
        },
    },
    {
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;

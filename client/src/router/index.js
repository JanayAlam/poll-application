import { createRouter, createWebHistory } from 'vue-router';

import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';
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
        path: '/:catchAll(.*)*',
        name: 'NotFound',
        component: NotFound,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated && to.name !== 'login' && to.name !== 'register') {
        return { name: 'login' };
    }
});

export default router;

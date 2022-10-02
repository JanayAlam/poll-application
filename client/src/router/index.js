import { createRouter, createWebHashHistory } from 'vue-router';

import Login from '../pages/auth/Login.vue';
import Register from '../pages/auth/Register.vue';
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
        beforeEnter: (_to, _from) => {
            if (!!localStorage.getItem('token')) {
                return false;
            }
        },
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        beforeEnter: (_to, _from) => {
            if (!!localStorage.getItem('token')) {
                return false;
            }
        },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from) => {
    const isAuthenticated = !!localStorage.getItem('token');
    if (!isAuthenticated && to.name !== 'login' && to.name !== 'register') {
        return { name: 'login' };
    }
});

export default router;

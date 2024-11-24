import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/views/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ProfilePage from '@/views/ProfilePage.vue';
import UserPage from '@/views/UserPage.vue';
import { isAdminOrManager } from '../utils/functions';

const routes = [
    {
        path: '/auth/login',
        name: 'Login',
        component: LoginPage
    },
    {
        path: '/auth/profile/:id',
        name: 'Profile',
        component: ProfilePage
    },
    {
        path: '/auth/users',
        name: 'Users',
        component: UserPage
    },
    {
        path: '/',
        name: 'Home',
        component: HomePage
    },
    {
        path: '/:catchAll(.*)',
        name: 'NotFound',
        component: NotFoundPage
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('auth_token') !== null;

    if (to.name === 'Login' && isAuthenticated)
        return next({ name: 'Home' });

    if (!isAuthenticated && to.name !== 'Login')
        return next({ name: 'Login', query: { redirectTo: to.fullPath } });

    if (to.name === 'Users' && !isAdminOrManager())
        return next({ name: 'Home' });
    next();
});

export default router;

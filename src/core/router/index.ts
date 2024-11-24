import { createRouter, createWebHistory } from 'vue-router';

import LoginPage from '@/views/Auth/LoginPage.vue';
import HomePage from '@/views/HomePage.vue';
import NotFoundPage from '@/views/NotFoundPage.vue';
import ProfilePage from '@/views/Auth/ProfilePage.vue';
import UserPage from '@/views/Auth/UserPage.vue';
import { isAdminOrManager } from '../utils/functions';
import SuppliersPage from '@/views/Supplier/SuppliersPage.vue';
import ProductPage from '@/views/Product/ProductPage.vue';
import CategoryPage from '@/views/Category/CategoryPage.vue';
import MovementPage from '@/views/Product/MovementPage.vue';

const routes = [
    { path: '/auth/login', name: 'Login', component: LoginPage },
    { path: '/auth/profile/:id', name: 'Profile', component: ProfilePage },
    { path: '/auth/users', name: 'Users', component: UserPage },
    { path: '/suppliers', name: 'Suppliers', component: SuppliersPage },
    { path: '/products', name: 'Products', component: ProductPage },
    { path: '/products/categories', name: 'Categories', component: CategoryPage },
    { path: '/products/movements', name: 'Movements', component: MovementPage },
    { path: '/', name: 'Home', component: HomePage },
    { path: '/:catchAll(.*)', name: 'NotFound', component: NotFoundPage },
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

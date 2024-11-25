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
import MovementPage from '@/views/Movement/MovementPage.vue';
import CreateProfilePage from '@/views/Auth/CreateProfilePage.vue';
import CreateSupplierPage from '@/views/Supplier/CreateSupplierPage.vue';
import UpdateSupplierPage from '@/views/Supplier/UpdateSupplierPage.vue';
import CreateProductPage from '@/views/Product/CreateProductPage.vue';
import UpdateProductPage from '@/views/Product/UpdateProductPage.vue';
import CreateCategoryPage from '@/views/Category/CreateCategoryPage.vue';
import UpdateCategoryPage from '@/views/Category/UpdateCategoryPage.vue';
import CreateMovementPage from '@/views/Movement/CreateMovementPage.vue';
import UpdateMovementPage from '@/views/Movement/UpdateMovementPage.vue';

const routes = [
    { name: 'Login', component: LoginPage, path: '/auth/login' },
    { name: 'Profile', component: ProfilePage, path: '/auth/profile/:id?', meta: { requiresAuth: true } },
    { name: 'CreateProfile', component: CreateProfilePage, path: '/auth/new/profile', meta: { requiresAdminOrManager: true } },
    { name: 'Users', component: UserPage, path: '/auth/users', meta: { requiresAdminOrManager: true } },

    { name: 'Suppliers', component: SuppliersPage, path: '/suppliers', meta: { requiresAuth: true } },
    { name: 'CreateSupplier', component: CreateSupplierPage, path: '/new/suppliers', meta: { requiresAdminOrManager: true } },
    { name: 'UpdateSupplier', component: UpdateSupplierPage, path: '/update/suppliers/:id', meta: { requiresAdminOrManager: true } },

    { name: 'Products', component: ProductPage, path: '/products', meta: { requiresAuth: true } },
    { name: 'CreateProduct', component: CreateProductPage, path: '/new/products', meta: { requiresAdminOrManager: true } },
    { name: 'UpdateProduct', component: UpdateProductPage, path: '/update/products/:id', meta: { requiresAdminOrManager: true } },

    { name: 'Categories', component: CategoryPage, path: '/products/categories', meta: { requiresAuth: true } },
    { name: 'CreateCategory', component: CreateCategoryPage, path: '/products/new/categories', meta: { requiresAdminOrManager: true } },
    { name: 'UpdateCategory', component: UpdateCategoryPage, path: '/products/update/categories/:id', meta: { requiresAdminOrManager: true } },

    { name: 'Movements', component: MovementPage, path: '/products/movements', meta: { requiresAuth: true } },
    { name: 'CreateMovement', component: CreateMovementPage, path: '/products/new/movements', meta: { requiresAuth: true } },
    { name: 'UpdateMovement', component: UpdateMovementPage, path: '/products/update/movements/:id', meta: { requiresAdminOrManager: true } },

    { name: 'Home', component: HomePage, path: '/' },
    { name: 'NotFound', component: NotFoundPage, path: '/:catchAll(.*)' },
];


const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('auth_token') !== null;

    if (to.name === 'Login') {
        if (isAuthenticated) return next({ name: 'Home' });

    }

    if (!isAuthenticated && to.matched.some(record => record.meta.requiresAuth))
        return next({ name: 'Login', query: { redirectTo: to.fullPath } });

    if (to.matched.some(record => record.meta.requiresAdminOrManager) && !isAdminOrManager())
        return;

    next();
});

export default router;

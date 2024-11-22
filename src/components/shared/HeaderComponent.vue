<script>
import { logout } from '@/core/http/services/authService';

export default {
    name: 'HeaderComponent',
    methods: {
        handleLogout() {
            logout(this.$router);
        }
    }
};
</script>

<template>
    <header class="app-header">
        <div class="logo">Meu App</div>
        <button @click="handleLogout" class="logout-button">Logout</button>
    </header>
</template>

<style scoped>
.app-header {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
    background-color: #333;
    color: white;
}

.logout-button {
    padding: 0.5rem 1rem;
    background-color: #f44336;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
}

.logout-button:hover {
    background-color: #e53935;
}
</style>
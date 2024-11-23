<script>
import { logout } from '@/core/http/services/authService';
import { encodeBase64 } from '@/core/utils/functions';

export default {
    name: 'HeaderComponent',
    methods: {
        handleLogout() {
            logout(this.$router);
        },
        handleEditProfile() {
            const id = encodeBase64('00000');
            this.$router.push({ name: 'Profile', params: { id } });
        }
    }
};

</script>

<template>
    <header class="app-header">
        <div class="logo">Meu App</div>
        <div class="settings-dropdown">
            <button class="settings-button">
                <span class="material-icons">settings</span> Configurações
            </button>
            <div class="dropdown-content">
                <button @click="handleEditProfile">
                    <span class="material-icons">person</span> Editar Perfil
                </button>
                <button @click="handleLogout">
                    <span class="material-icons">logout</span> Logout
                </button>
            </div>
        </div>
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

.settings-dropdown {
    position: relative;
    display: inline-block;
}

.settings-button {
    display: flex;
    align-items: center;
    padding: 0.5rem 1rem;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 16px;
    min-width: 150px;
    border-radius: 5px;
}

.settings-button .material-icons {
    font-size: 24px;
    margin-right: 8px;
}

.settings-button:hover {
    background-color: #444;
}

.dropdown-content {
    position: absolute;
    background-color: #333;
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 1;
    right: 0;
    border-radius: 5px;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: opacity 0.3s ease, visibility 0s linear 0.3s;
}

.dropdown-content button {
    width: 100%;
    padding: 10px;
    text-align: left;
    background-color: #333;
    color: white;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
}

.dropdown-content button .material-icons {
    font-size: 20px;
    margin-right: 10px;
}

.dropdown-content button:hover {
    background-color: #555;
}

.settings-dropdown:hover .dropdown-content {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transition: opacity 0.3s ease, visibility 0s linear 0s;
}
</style>

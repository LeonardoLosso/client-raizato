<script lang="ts">
import { computed, defineComponent } from 'vue';
import { logout } from '@/core/http/services/authService';
import { isAdminOrManager } from '@/core/utils/functions';
import { useRouter } from 'vue-router';

export default defineComponent({
    name: 'HeaderComponent',
    setup() {
        const router = useRouter();

        const handleLogout = (): void => {
            logout(router);
        };

        const handleEditProfile = (): void => {
            router.push({ name: 'Profile' });
        };

        const navigateTo = (routeName: string): void => {
            router.push({ name: routeName });
        };
        const isUser = computed(() => !isAdminOrManager());

        return {
            isUser,
            handleLogout,
            handleEditProfile,
            navigateTo
        };
    }
});
</script>

<template>
    <header class="app-header">
        <div class="menu-item logo-item">
            <button class="menu-button logo-button" @click="navigateTo('Home')">
                <div class="logo-container">
                    <img src="../../assets/logo.png" class="logo-image" alt="logo">
                    <h2 class="logo-text">StockRuller</h2>
                </div>
            </button>
        </div>

        <nav class="menu">
            <!-- MOVIMENTAÇÕES -->
            <div class="menu-item">
                <button class="menu-button" @click="navigateTo('Movements')">
                    <span class="material-icons">swap_horiz</span> Movimentações
                </button>
                <!-- SUBMENU -->
                <div class="submenu" v-if="!isUser">
                    <button @click="navigateTo('Movements')">
                        <span class="material-icons">list</span> Listar
                    </button>
                    <button @click="navigateTo('')">
                        <span class="material-icons">add</span> Novo
                    </button>
                </div>
            </div>

            <!-- PRODUTOS -->
            <div class="menu-item">
                <button class="menu-button" @click="navigateTo('Products')">
                    <span class="material-icons">store</span> Produtos
                </button>
                <!-- SUBMENU -->
                <div class="submenu" v-if="!isUser">
                    <button @click="navigateTo('Products')">
                        <span class="material-icons">list</span> Listar
                    </button>
                    <button @click="navigateTo('CreateProduct')">
                        <span class="material-icons">add</span> Novo
                    </button>
                </div>
            </div>

            <!-- CATEGORIAS -->
            <div class="menu-item">
                <button class="menu-button" @click="navigateTo('Categories')">
                    <span class="material-icons">category</span> Categorias
                </button>
                <!-- SUBMENU -->
                <div class="submenu" v-if="!isUser">
                    <button @click="navigateTo('Categories')">
                        <span class="material-icons">list</span> Listar
                    </button>
                    <button @click="navigateTo('')">
                        <span class="material-icons">add</span> Novo
                    </button>
                </div>
            </div>

            <!-- FORNECEDORES -->
            <div class="menu-item">
                <button class="menu-button" @click="navigateTo('Suppliers')">
                    <span class="material-icons">person</span> Fornecedores
                </button>
                <!-- SUBMENU -->
                <div class="submenu" v-if="!isUser">
                    <button @click="navigateTo('Suppliers')">
                        <span class="material-icons">groups</span> Listar
                    </button>
                    <button @click="navigateTo('CreateSupplier')">
                        <span class="material-icons">person_add</span> Novo
                    </button>
                </div>
            </div>

            <!-- USERS -->
            <div class="menu-item" v-if="!isUser">
                <button class="menu-button" @click="navigateTo('Users')">
                    <span class="material-icons">manage_accounts</span> Usuários
                </button>
                <!-- SUBMENU -->
                <div class="submenu">
                    <button @click="navigateTo('Users')">
                        <span class="material-icons">groups</span> Listar
                    </button>
                    <button @click="navigateTo('CreateProfile')">
                        <span class="material-icons">person_add</span> Novo
                    </button>
                </div>
            </div>
        </nav>

        <div class="menu-item">
            <button class="menu-button">
                <span class="material-icons">settings</span> Configurações
            </button>
            <!-- SUBMENU -->
            <div class="submenu">
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
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: white;
}

.menu {
    display: flex;
    gap: 1rem;
}

.menu-item {
    position: relative;
}

.menu-button {
    background-color: transparent;
    color: white;
    border: none;
    font-size: 16px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.menu-button .material-icons {
    margin-right: 8px;
}

.menu-button:hover {
    background-color: #444;
}

.submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: #333;
    border-radius: 5px;
    display: none;
    flex-direction: column;
    min-width: 160px;
    box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
    z-index: 10;
}

.menu-item:hover .submenu {
    display: flex;
}

.submenu button {
    background-color: transparent;
    color: white;
    padding: 0.5rem 1rem;
    font-size: 16px;
    border: none;
    display: flex;
    align-items: center;
    cursor: pointer;
    text-align: left;
    transition: background-color 0.3s ease;
    align-items: center;
    justify-content: flex-start;
}

.submenu button .material-icons {
    margin-right: 8px;
}

.submenu button:hover {
    background-color: #555;
}

.logo-container {
    display: flex;
    align-items: center;
    gap: 10px;
}

.logo-image {
    width: 36px;
    height: auto;
}

.logo-text {
    font-size: 1.5rem;
    margin: 0;
}
</style>

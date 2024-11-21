<template>
    <div class="login-container">
        <form @submit.prevent="handleLogin" class="login-form">
            <h2>Login</h2>
            <InputField label="Usuário" id="email" v-model="email" placeholder="Digite seu nome de usuário" />
            <InputPassword label="Senha" id="password" v-model="password" placeholder="Digite sua senha" />
            <ButtonComponent :loading="isLoading" type="primary" @click="handleSubmit">
                Entrar
            </ButtonComponent>
        </form>
    </div>
</template>


<script>
import InputPassword from "@/components/auth/InputPassword.vue";
import ButtonComponent from "@/components/shared/ButtonComponent.vue";
import InputField from "@/components/shared/InputField.vue";
import { login } from '@/services/authService';

export default {
    name: "LoginPage",
    components: {
        InputField,
        InputPassword,
        ButtonComponent
    },
    data() {
        return {
            email: "",
            password: "",
            isLoading: false
        };
    },
    methods: {
        async handleLogin() {
            this.isLoading = true;
            try {
                const credentials = {
                    email: this.email,
                    password: this.password,
                };
                const data = await login(credentials);
                console.log('Login bem-sucedido!', data);
            } catch (error) {
                console.error('Erro ao fazer login:', error);
            } finally {
                this.isLoading = false;
            }
        },
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f4f7fc;
}

.login-form {
    width: 100%;
    max-width: 400px;
    padding: 24px;
    background-color: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
}

.login-form h2 {
    text-align: center;
    margin-bottom: 24px;
}

.login-form .input-field {
    margin-bottom: 20px;
}

.login-form .btn {
    width: 100%;
    margin-top: 20px;
}
</style>
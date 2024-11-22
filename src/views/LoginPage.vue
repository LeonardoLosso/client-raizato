<script>
import InputPassword from "@/components/auth/InputPassword.vue";
import ButtonComponent from "@/components/shared/ButtonComponent.vue";
import InputField from "@/components/shared/InputField.vue";
import { login } from '@/core/http/services/authService';

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
        async handleSubmit() {
            this.isLoading = true;

            const credentials = {
                email: this.email,
                password: this.password,
            };

            await login(credentials, this.$router).then(() => this.isLoading = false);
        },
    }
};
</script>

<template>
    <div class="login-container">
        <form @submit.prevent="handleSubmit" class="login-form">
            <h2>Login</h2>
            <InputField label="Usuário" id="email" v-model="email" placeholder="Digite seu nome de usuário"
                autocomplete="email" />
            <InputPassword label="Senha" id="password" v-model="password" placeholder="Digite sua senha" />
            <ButtonComponent :loading="isLoading" type="primary">
                Entrar
            </ButtonComponent>
        </form>
    </div>
</template>

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
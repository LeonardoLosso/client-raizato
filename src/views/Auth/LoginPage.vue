<script>
import InputPassword from "@/components/shared/input/InputPassword.vue";
import ButtonComponent from "@/components/shared/ButtonComponent.vue";
import InputField from "@/components/shared/input/InputField.vue";
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

            const redirectTo = this.$route.query.redirectTo || '/';
            await login(credentials, this.$router, redirectTo).then(() => this.isLoading = false);
        },
    }
};
</script>

<template>
    <div class="centered-container">
        <form @submit.prevent="handleSubmit" class="login-form">
            <h2>{{ 'Login' }}</h2>
            <InputField label="Usuário" id="email" v-model="email" placeholder="Digite seu email" autocomplete="email"
                required />
            <InputPassword label="Senha" id="password" v-model="password" placeholder="Digite sua senha" required />
            <ButtonComponent :loading="isLoading" type="primary" label="Entrar" />
        </form>
    </div>
</template>

<style scoped>
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
<script lang="ts">
import { ref, onMounted } from 'vue';
import InputPassword from "@/components/shared/input/InputPassword.vue";
import ButtonComponent from "@/components/shared/ButtonComponent.vue";
import InputField from "@/components/shared/input/InputField.vue";
import { login, someAdmin, createUser } from '@/core/http/services/authService';
import UserForm from '@/components/auth/UserForm.vue';
import { User } from '@/core/types/auth';
import router from '@/core/router';

export default {
    name: "LoginPage",
    components: {
        InputField,
        InputPassword,
        ButtonComponent,
        UserForm
    },
    props: {
        user: {
            type: Object as () => User,
            required: false,
            default: () => ({
                id: null,
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                role: 'admin'
            }),
        },
    },
    setup() {
        const email = ref("");
        const password = ref("");
        const isLoading = ref(false);
        const verify = ref(false);
        const isLoadingVerify = ref(true);
        const isSaving = ref(false);

        const handleSubmitLogin = async () => {
            isLoading.value = true;

            const credentials = {
                email: email.value,
                password: password.value,
            };

            const redirectTo = new URLSearchParams(window.location.search).get('redirectTo') || '/';
            await login(credentials, router, redirectTo).then(() => {
                isLoading.value = false;
            });
        };

        const handleSubmitUserCreation = async (userData: User) => {
            isSaving.value = true;

            try {
                const res = await createUser(userData);
                isSaving.value = false;
                if (res) {
                    email.value = userData.email;
                    password.value = userData.password ?? '';

                    handleSubmitLogin();
                }
                router.push({ name: 'Login' });

            } catch (error) {
                isSaving.value = false;
                console.error("Erro ao criar usuário:", error);
            }
        };

        const verifyFirstAccess = async () => {
            try {
                const response = await someAdmin();
                verify.value = !!response;
            } catch (error) {
                verify.value = false;
            } finally {
                isLoadingVerify.value = false;
            }
        };

        onMounted(() => {
            verifyFirstAccess();
        });

        return {
            email,
            password,
            isLoading,
            isSaving,
            handleSubmitLogin,
            handleSubmitUserCreation,
            verify,
            isLoadingVerify,
        };
    }
};
</script>

<template>
    <div class="centered-container">
        <div v-if="isLoadingVerify">
            <p>Verificando admin...</p>
        </div>

        <div v-if="!isLoadingVerify && !verify">
            <UserForm :isEditing="false" @saveUser="handleSubmitUserCreation" :isSaving="isSaving" :firstAccess="true"
                :user="user" />
        </div>

        <form v-if="!isLoadingVerify && verify" @submit.prevent="handleSubmitLogin" class="login-form">
            <h2>{{ 'Login' }}</h2>
            <InputField label="Usuário" id="email" v-model="email" placeholder="Digite seu email" autocomplete="email"
                required />
            <InputPassword label="Senha" id="password" v-model="password" placeholder="Digite sua senha" required />
            <ButtonComponent :loading="isLoading" type="primary" label="Entrar" @clickEvent="handleSubmitLogin" />
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

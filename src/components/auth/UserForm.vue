<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
import InputPassword from '@/components/auth/InputPassword.vue';
import InputField from '../shared/InputField.vue';
import ButtonComponent from '../shared/ButtonComponent.vue';
import { isAdmin, isAdminOrManager } from '@/core/utils/functions';
import { User } from '@/core/types/auth';

export default defineComponent({
    name: 'UserForm',
    components: {
        InputPassword,
        InputField,
        ButtonComponent
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
                role: ''
            }),
        },
        isEditing: { type: Boolean, default: false },
        isSaving: { type: Boolean, default: false },
        isDeleting: { type: Boolean, default: false }
    },
    setup(props, { emit }) {
        // Estado
        const formData = ref({ ...props.user });
        const password = ref('');
        const passwordConfirmation = ref('');
        const errorMessages = ref<string[]>([]);

        // Computed
        const isPasswordRequired = computed(() => !props.isEditing);

        // Funções
        const validateForm = (): boolean => {
            errorMessages.value = [];

            if (isPasswordRequired.value || password.value) {
                const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

                if (!password.value) {
                    errorMessages.value.push('Senha é obrigatória.');
                } else if (!passwordRegex.test(password.value)) {
                    errorMessages.value.push(
                        'A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número.'
                    );
                }

                if (password.value !== passwordConfirmation.value) {
                    errorMessages.value.push('As senhas não coincidem.');
                }
            }

            return errorMessages.value.length === 0;
        };

        const submitForm = () => {
            if (validateForm()) {
                const form: User = { ...formData.value };
                if (password.value) {
                    form.password = password.value;
                    form.passwordConfirmation = passwordConfirmation.value;
                }
                emit('saveUser', form);
            }
        };

        const cancel = () => {
            emit('cancel');
        };

        const deleteUser = () => {
            if (confirm('Tem certeza de que deseja excluir este usuário?')) {
                emit('delete', formData.value.id);
            }
        };

        const isUser = computed(() => !isAdminOrManager());
        const isManager = computed(() => !isAdmin());

        watch(() => props.user, (newVal) => {
            formData.value = { ...newVal };
        }, { deep: true });

        return {
            formData,
            password,
            passwordConfirmation,
            errorMessages,
            isPasswordRequired,
            submitForm,
            cancel,
            deleteUser,
            isUser,
            isManager
        };
    }
});
</script>

<template>
    <div class="container">
        <h1>{{ isEditing ? "Editar Perfil" : "Novo Usuário" }}</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <InputField label="Primeiro Nome" id="firstName" v-model="formData.firstName"
                    placeholder="Nome do cadastro" autocomplete="given-name" required />
            </div>
            <div class="form-group">
                <InputField label="Sobrenome" id="lastName" v-model="formData.lastName"
                    placeholder="Sobrenome do cadastro" autocomplete="family-name" required />
            </div>
            <div class="form-group">
                <InputField label="Telefone" id="phone" v-model="formData.phone" placeholder="Telefone do cadastro"
                    autocomplete="tel" />
            </div>
            <div class="container-group">
                <div class="form-group">
                    <InputField label="Email" id="email" v-model="formData.email" placeholder="Email do cadastro"
                        autocomplete="email" required />
                </div>
                <div class="form-group">
                    <label for="role">Papel</label>
                    <select :disabled="isUser" id="role" v-model="formData.role" required>
                        <option value="" disabled>Selecione o Papel</option>
                        <option v-if="!isManager" value="admin">Administrador</option>
                        <option value="manager">Gerente</option>
                        <option value="user">Usuário</option>
                    </select>
                </div>
            </div>

            <div class="container-group">
                <div class="form-group">
                    <InputPassword id="password" :label="isEditing ? 'Nova Senha' : 'Senha'" v-model="password"
                        placeholder="Digite a senha" :required="!isEditing" />
                </div>
                <div class="form-group">
                    <InputPassword id="passwordConfirmation" label="Confirmar Senha" v-model="passwordConfirmation"
                        placeholder="Confirme a senha" :required="password?.length > 0"
                        :disabled="!(password?.length > 0)" />
                </div>
            </div>

            <div class="form-errors" v-if="errorMessages.length">
                <ul>
                    <li v-for="(error, index) in errorMessages" :key="index">
                        {{ error }}
                    </li>
                </ul>
            </div>

            <div class="form-actions">
                <div class="wrap-btn">
                    <ButtonComponent :loading="isSaving" type="primary" label="Salvar" @clickEvent="submitForm" />

                    <ButtonComponent type="cancel" label="Cancelar" @clickEvent="cancel" />
                </div>

                <ButtonComponent v-if="isEditing && !isUser" :loading="isDeleting" type="delete" label="Excluir"
                    @clickEvent="deleteUser" />
            </div>
        </form>
    </div>
</template>

<style scoped>
.container {
    max-width: 600px;
    padding: 20px;
    background-color: #fafafa;
}

.container h1 {
    text-align: center;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

.container-group {
    display: flex;
    gap: 20px;
}

.container-group .form-group {
    flex: 1;
    margin: 0 !important;
}

.form-actions {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    margin-top: 30px;
}

.wrap-btn {
    display: flex;
    justify-content: space-between;
    gap: 10px;
}
</style>
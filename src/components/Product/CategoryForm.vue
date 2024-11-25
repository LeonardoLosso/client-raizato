<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import InputField from '../shared/input/InputField.vue';
import ButtonComponent from '../shared/ButtonComponent.vue';

export default defineComponent({
    name: 'CategoryForm',
    components: {
        InputField,
        ButtonComponent
    },
    props: {
        category: {
            type: Object as () => { id: number | null, nome: string, descricao: string },
            required: false,
            default: () => ({ id: null, nome: '', descricao: '' }),
        },
        isEditing: { type: Boolean, default: false },
        isSaving: { type: Boolean, default: false },
        isDeleting: { type: Boolean, default: false }
    },
    setup(props, { emit }) {
        const formData = ref({ ...props.category });
        const errorMessages = ref<string[]>([]);

        const validateForm = (): boolean => {
            errorMessages.value = [];

            if (!formData.value.nome) {
                errorMessages.value.push('Nome é obrigatório.');
            }

            return errorMessages.value.length === 0;
        };

        const submitForm = () => {
            if (validateForm()) {
                const form = { ...formData.value };
                emit('saveCategory', form);
            }
        };

        const cancel = () => {
            emit('cancel');
        };

        const deleteCategory = () => {
            if (confirm('Tem certeza de que deseja excluir esta categoria?')) {
                emit('delete', formData.value.id);
            }
        };

        watch(() => props.category, (newVal) => {
            formData.value = { ...newVal };
        }, { deep: true });

        return {
            formData,
            errorMessages,
            submitForm,
            cancel,
            deleteCategory
        };
    }
});
</script>

<template>
    <div class="container">
        <h1>{{ isEditing ? "Editar Categoria" : "Nova Categoria" }}</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <InputField label="Nome" id="name" v-model="formData.nome" placeholder="Nome da categoria" required />
            </div>
            <div class="form-group">
                <InputField label="Descrição" id="description" v-model="formData.descricao"
                    placeholder="Descrição da categoria" />
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
                    <ButtonComponent :loading="isSaving" type="primary" label="Salvar" @clickEvent="submitForm"
                        :disabled="isSaving || isDeleting" />

                    <ButtonComponent type="cancel" label="Cancelar" @clickEvent="cancel"
                        :disabled="isSaving || isDeleting" />
                </div>

                <ButtonComponent v-if="isEditing" :loading="isDeleting" type="delete" label="Excluir"
                    @clickEvent="deleteCategory" :disabled="isSaving || isDeleting" />
            </div>
        </form>
    </div>
</template>

<style scoped></style>

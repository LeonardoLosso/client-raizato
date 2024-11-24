<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import InputField from '../shared/InputField.vue';
import ButtonComponent from '../shared/ButtonComponent.vue';
import { Supplier } from '@/core/types/suppliers';

export default defineComponent({
    name: 'SupplierForm',
    components: {
        InputField,
        ButtonComponent
    },
    props: {
        supplier: {
            type: Object as () => Supplier,
            required: false,
            default: () => ({ id: null, nome: '', cnpj: '', contato: '' }),
        },
        isEditing: { type: Boolean, default: false },
        isSaving: { type: Boolean, default: false },
        isDeleting: { type: Boolean, default: false }
    },
    setup(props, { emit }) {
        const formData = ref({ ...props.supplier });
        const errorMessages = ref<string[]>([]);

        const validateForm = (): boolean => {
            errorMessages.value = [];

            if (!formData.value.nome) {
                errorMessages.value.push('Nome é obrigatório.');
            }

            if (!formData.value.cnpj) {
                errorMessages.value.push('CNPJ é obrigatório.');
            }

            return errorMessages.value.length === 0;
        };

        const submitForm = () => {

            if (validateForm()) {
                const form: Supplier = { ...formData.value };
                emit('saveSupplier', form);
            }
        };

        const cancel = () => {
            emit('cancel');
        };

        const deleteSupplier = () => {
            if (confirm('Tem certeza de que deseja excluir este fornecedor?')) {
                emit('delete', formData.value.id);
            }
        };

        watch(() => props.supplier, (newVal) => {
            formData.value = { ...newVal };
        }, { deep: true });

        return {
            formData,
            errorMessages,
            submitForm,
            cancel,
            deleteSupplier
        };
    }
});
</script>

<template>
    <div class="container">
        <h1>{{ isEditing ? "Editar Fornecedor" : "Novo Fornecedor" }}</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <InputField label="Nome" id="name" v-model="formData.nome" placeholder="Nome do fornecedor" required />
            </div>
            <div class="form-group">
                <InputField label="CNPJ" id="cnpj" v-model="formData.cnpj" placeholder="CNPJ do fornecedor" required />
            </div>
            <div class="form-group">
                <InputField label="Contato" id="contact" v-model="formData.contato"
                    placeholder="Contato do fornecedor" />
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
                    @clickEvent="deleteSupplier" :disabled="isSaving || isDeleting" />
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

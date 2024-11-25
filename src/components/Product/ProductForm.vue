<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ButtonComponent from '../shared/ButtonComponent.vue';
import { Product } from '@/core/types/products';
import InputField from '../shared/input/InputField.vue';
import InputNumber from '../shared/input/InputNumber.vue';
import DropdownBase from '../shared/input/DropdownBase.vue';
import InputData from '../shared/input/InputData.vue';
import InputTextArea from '../shared/input/InputTextArea.vue';

export default defineComponent({
    name: 'ProductForm',
    components: {
        InputField,
        InputNumber,
        InputTextArea,
        ButtonComponent,
        DropdownBase,
        InputData
    },
    props: {
        product: {
            type: Object as () => Product,
            required: false,
            default: () => ({
                id: null,
                name: '',
                code: '',
                description: '',
                categoryId: null,
                fornecedorId: null,
                costPrice: null,
                salePrice: null,
                minStock: null,
                stock: 0,
                expiryDate: null,
            }),
        },
        isEditing: { type: Boolean, default: false },
        isSaving: { type: Boolean, default: false },
        isDeleting: { type: Boolean, default: false }
    },
    setup(props, { emit }) {
        const formData = ref({ ...props.product });
        const errorMessages = ref<string[]>([]);

        const validateForm = (): boolean => {
            errorMessages.value = [];

            // Validar nome
            if (!formData.value.name?.trim()) {
                errorMessages.value.push('O campo "Nome" é obrigatório.');
            }

            // Validar código
            if (!formData.value.code?.trim()) {
                errorMessages.value.push('O campo "Código" é obrigatório.');
            }

            // Validar categoria e fornecedor
            if (!formData.value.categoryId) {
                errorMessages.value.push('A seleção de uma "Categoria" é obrigatória.');
            }
            if (!formData.value.fornecedorId) {
                errorMessages.value.push('A seleção de um "Fornecedor" é obrigatória.');
            }

            // Validar preços
            if (!formData.value.costPrice || formData.value.costPrice <= 0) {
                errorMessages.value.push('O campo "Preço de Custo" deve ser maior que 0.');
            }
            if (!formData.value.salePrice || formData.value.salePrice <= 0) {
                errorMessages.value.push('O campo "Preço de Venda" deve ser maior que 0.');
            }
            if (formData.value.salePrice && formData.value.costPrice && formData.value.salePrice < formData.value.costPrice) {
                errorMessages.value.push('O "Preço de Venda" não pode ser menor que o "Preço de Custo".');
            }

            // Validar estoque
            if (formData.value.minStock !== null && (formData.value.minStock ?? 0) < 0) {
                errorMessages.value.push('O campo "Estoque Mínimo" não pode ser negativo.');
            }
            if (formData.value.stock !== null && (formData.value.stock ?? 0) < 0) {
                errorMessages.value.push('O campo "Estoque" não pode ser negativo.');
            }

            return errorMessages.value.length === 0;
        };


        const submitForm = () => {

            if (validateForm()) {
                const form: Product = { ...formData.value };
                emit('saveProduct', form);
            }
        };

        const cancel = () => {
            emit('cancel');
        };

        const deleteProduct = () => {
            if (confirm('Tem certeza de que deseja excluir este produto?')) {
                emit('delete', formData.value.id);
            }
        };

        watch(() => props.product, (newVal) => {
            formData.value = {
                ...newVal,
                categoryId: newVal.categoryId ?? null,
                categoryName: newVal.categoryName ?? null,
                fornecedorId: newVal.fornecedorId ?? null,
                fornecedorName: newVal.fornecedorName ?? null,
                costPrice: newVal.costPrice ?? 0,
                salePrice: newVal.salePrice ?? 0,
                minStock: newVal.minStock ?? 0,
                stock: newVal.stock ?? 0,
            };
        }, { deep: true });

        return {
            formData,
            errorMessages,
            submitForm,
            cancel,
            deleteProduct
        };
    }
});
</script>

<template>
    <div class="container">
        <h1>{{ isEditing ? "Editar Produto" : "Novo Produto" }}</h1>
        <form @submit.prevent="submitForm">
            <div class="form-group">
                <InputField label="Nome" id="name" v-model="formData.name" placeholder="Nome do produto" required />
            </div>
            <div class="form-group-inline">
                <div class="form-group">
                    <InputField label="Código" id="code" v-model="formData.code" placeholder="Código do produto"
                        required />
                </div>
                <!-- CATEGORIA -->
                <div class="form-group">
                    <DropdownBase label="Categoria" id="categoryId" :apiUrl="'/categorias'"
                        v-model="formData.categoryId" :isRequired="true" :firstQuery="formData.categoryName" />
                </div>
            </div>

            <!-- FORNECEDOR -->
            <div class="form-group">
                <DropdownBase label="Fornecedor" id="fornecedorId" :apiUrl="'/fornecedores'"
                    v-model="formData.fornecedorId" :isRequired="true" :firstQuery="formData.fornecedorName" />
            </div>

            <div class="form-group-inline">
                <div class="form-group">
                    <InputNumber label="Preço de Custo" id="costPrice" v-model="formData.costPrice" :min="1" required />
                </div>
                <div class="form-group">
                    <InputNumber label="Preço de Venda" id="salePrice" v-model="formData.salePrice" :min="1" required />
                </div>
            </div>

            <div class="form-group-inline">
                <div class="form-group">
                    <InputNumber label="Estoque Mínimo" id="minStock" v-model="formData.minStock" :min="1" :step="1"
                        required :currency="false" />
                </div>
                <div class="form-group">
                    <InputData label="Data de Validade" id="expiryDate" v-model="formData.expiryDate" required />
                </div>
            </div>
            <div class="form-group-inline">
                <div class="form-group">
                    <InputNumber label="Ajuste de Estoque" id="stock" v-model="formData.stock" :min="1" :step="1"
                        required :currency="false" />
                </div>
                <span class="spacer-f1"></span>
            </div>
            <div class="form-group">
                <InputTextArea label="Descrição" id="description" v-model="formData.description"
                    placeholder="Descrição da categoria" :maxlength="500" :rows="4" :cols="50" />
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
                    @clickEvent="deleteProduct" :disabled="isSaving || isDeleting" />
            </div>
        </form>
    </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import ButtonComponent from '../shared/ButtonComponent.vue';
import DropdownBase from '../shared/input/DropdownBase.vue';
import InputNumber from '../shared/input/InputNumber.vue';
import InputData from '../shared/input/InputData.vue';
import InputTextArea from '../shared/input/InputTextArea.vue';
import { Movement } from '@/core/types/products';


export default defineComponent({
    name: 'MovementForm',
    components: {
        ButtonComponent,
        DropdownBase,
        InputNumber,
        InputData,
        InputTextArea,
    },
    props: {
        movement: {
            type: Object as () => Partial<Movement>,
            required: false,
            default: () => ({
                id: null,
                productId: null,
                movementType: '',
                quantity: null,
                unitPrice: null,
                totalPrice: null,
                description: '',
                date: null,
            }),
        },
        isEditing: { type: Boolean, default: false },
        isSaving: { type: Boolean, default: false },
    },
    setup(props, { emit }) {
        const formData = ref({ ...props.movement });
        const errorMessages = ref<string[]>([]);
        const movementTypes = [
            { value: 'compras', text: 'Compras' },
            { value: 'devolucoes', text: 'Devoluções' },
            { value: 'vendas', text: 'Vendas' },
            { value: 'perdas', text: 'Perdas' },
        ];

        const validateForm = (): boolean => {
            errorMessages.value = [];

            if (!formData.value.productId) {
                errorMessages.value.push('Produto é obrigatório.');
            }

            if (!formData.value.movementType) {
                errorMessages.value.push('Tipo de movimentação é obrigatório.');
            }

            if ((formData.value.quantity ?? 0) <= 0) {
                errorMessages.value.push('Quantidade deve ser maior que 0.');
            }

            if ((formData.value.unitPrice ?? 0) <= 0) {
                errorMessages.value.push('Preço unitário deve ser maior que 0.');
            }

            return errorMessages.value.length === 0;
        };

        const submitForm = () => {
            if (validateForm()) {
                emit('saveMovement', { ...formData.value });
            }
        };

        const cancel = () => {
            emit('cancel');
        };

        watch(
            () => props.movement,
            (newVal) => {
                formData.value = { ...newVal };
            },
            { deep: true }
        );

        return {
            formData,
            errorMessages,
            movementTypes,
            submitForm,
            cancel,
        };
    },
});
</script>

<template>
    <div class="container">
        <h1>{{ isEditing ? 'Editar Movimentação' : 'Nova Movimentação' }}</h1>
        <form @submit.prevent="submitForm">
            <!-- Produto -->
            <div class="form-group">
                <DropdownBase label="Produto" id="productId" :apiUrl="'/produtos'" v-model="formData.productId"
                    :isRequired="true" placeholder="Selecione um produto" :first-query="formData.productName" />
            </div>

            <!-- Tipo de Movimentação -->
            <div class="form-group">
                <label for="movementType">Tipo de Movimentação</label>
                <select id="movementType" v-model="formData.movementType" required>
                    <option value="" disabled>Selecione o tipo</option>
                    <option v-for="type in movementTypes" :key="type.value" :value="type.value">
                        {{ type.text }}
                    </option>
                </select>
            </div>

            <div class="form-group-inline">
                <!-- Quantidade -->
                <div class="form-group">
                    <InputNumber label="Quantidade" id="quantity" v-model="formData.quantity" :min="1" required
                        :currency="false" />
                </div>

                <!-- Preço Unitário -->
                <div class="form-group">
                    <InputNumber label="Preço Unitário" id="unitPrice" v-model="formData.unitPrice" :min="0.01"
                        required />
                </div>
            </div>

            <!-- Data -->
            <div class="form-group">
                <InputData label="Data" id="date" v-model="formData.date" required />
            </div>

            <!-- Descrição -->
            <div class="form-group">
                <InputTextArea label="Descrição" id="description" v-model="formData.description"
                    placeholder="Descrição da movimentação" :maxlength="500" :rows="4" :cols="50" />
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
                        :disabled="isSaving" />

                    <ButtonComponent type=" cancel" label="Cancelar" @clickEvent="cancel" :disabled="isSaving" />
                </div>

            </div>
        </form>
    </div>
</template>

<style scoped></style>

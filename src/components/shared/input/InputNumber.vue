<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'InputNumber',
    props: {
        label: { type: String as PropType<string>, required: true, },
        id: { type: String as PropType<string>, required: true, },
        modelValue: { type: [Number, null] as PropType<number | null>, default: null, },
        required: { type: Boolean, default: false, },
        min: { type: Number as PropType<number>, default: undefined, },
        max: { type: Number as PropType<number>, default: undefined, },
        step: { type: Number as PropType<number>, default: 1, },
        currency: { type: Boolean, default: true, },
    },
    methods: {
        updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            let value: string | number | null = target.value ? target.value.replace(',', '.') : null;
            value = value ? parseFloat(value) : null;
            this.$emit('update:modelValue', value);
        },
    },
    watch: {
        modelValue(newValue) {
            if (newValue !== null) {
                const formattedValue = newValue.toString().replace('.', ',');
                this.$emit('update:modelValue', formattedValue);
            }
        },
    },
});
</script>

<template>
    <div class="input-field">
        <label :for="id">{{ label }}</label>
        <span v-if="required" class="required-indicator">*</span>
        <div class="input-wrapper">
            <span v-if="currency" class="currency-symbol">R$</span>
            <input type="text" :id="id" :value="modelValue !== null ? modelValue : ''" @input="updateValue($event)"
                :required="required" :min="min" :max="max" :step="step" class="input-number" placeholder="0" />
        </div>
    </div>
</template>

<style scoped>
.input-field {
    margin-bottom: 15px;
}

.input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
}

.currency-symbol {
    position: absolute;
    left: 10px;
    font-weight: bold;
    color: #333;
}

.input-number {
    text-align: right;
}

.input-number::-webkit-outer-spin-button,
.input-number::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}
</style>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'InputData',
    props: {
        label: {
            type: String as PropType<string>,
            required: true,
        },
        id: {
            type: String as PropType<string>,
            required: true,
        },
        modelValue: {
            type: [Date, String, null] as PropType<Date | String | null>,
            default: null,
        },
        required: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['update:modelValue'],
    methods: {
        updateValue(event: Event) {
            const target = event.target as HTMLInputElement;
            this.$emit('update:modelValue', target.value);
        },
    },
    watch: {
        modelValue(newVal) {
            if (newVal && typeof newVal === 'string' && !isNaN(Date.parse(newVal))) {
                const date = new Date(newVal);
                const formattedDate = date.toISOString().split('T')[0];
                this.$emit('update:modelValue', formattedDate);
            }
        }
    },
});

</script>

<template>
    <div class="input-field">
        <label :for="id">{{ label }}</label>
        <span v-if="required" class="required-indicator">*</span>
        <input type="date" :id="id" :value="modelValue ? modelValue : ''" @input="updateValue" :required="required" />
    </div>
</template>

<style scoped>
input {
    font-family: Arial, Helvetica, sans-serif;
    max-height: 40px;

}

input:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 4px rgba(0, 123, 255, 0.25);
}
</style>

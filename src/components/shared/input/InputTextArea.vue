<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
    name: 'InputTextArea',
    props: {
        label: {
            type: String as PropType<string>,
            required: true
        },
        id: {
            type: String as PropType<string>,
            required: true
        },
        placeholder: {
            type: String as PropType<string>,
            default: ''
        },
        modelValue: {
            type: String as PropType<string>,
            default: ''
        },
        rows: {
            type: Number as PropType<number>,
            default: 4
        },
        cols: {
            type: Number as PropType<number>,
            default: 50
        },
        maxlength: {
            type: Number as PropType<number>,
            default: 500
        }
    },
    methods: {
        updateValue(event: Event) {
            const target = event.target as HTMLTextAreaElement;
            this.$emit('update:modelValue', target.value);
        }
    }
});
</script>

<template>
    <div class="input-field">
        <label :for="id">{{ label }}</label>
        <textarea :id="id" :placeholder="placeholder" :rows="rows" :cols="cols" :maxlength="maxlength"
            :value="modelValue" @input="updateValue" class="form-control"></textarea>
        <small>{{ modelValue?.length }} / {{ maxlength }} caracteres</small>
    </div>
</template>

<style scoped>
textarea {
    resize: none;
}
</style>

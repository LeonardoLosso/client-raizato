<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'InputField',
  props: {
    label: {
      type: String as PropType<string>,
      required: true
    },
    id: {
      type: String as PropType<string>,
      required: true
    },
    type: {
      type: String as PropType<string>,
      default: 'text'
    },
    placeholder: {
      type: String as PropType<string>,
      default: ''
    },
    modelValue: {
      type: String as PropType<string>,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    autocomplete: {
      type: String as PropType<string>,
      default: ''
    }
  },
  methods: {
    updateValue(event: Event) {
      const target = event.target as HTMLInputElement;
      this.$emit('update:modelValue', target.value);
    }
  }
});
</script>


<template>
  <div class="input-field">
    <label :for="id">{{ label }}</label>
    <span v-if="required" class="required-indicator">*</span>
    <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue" @input="updateValue($event)"
      :autocomplete="autocomplete" :required="required" />
  </div>
</template>


<style scoped>
.input-field {
  margin-bottom: 15px;
}
</style>

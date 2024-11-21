<template>
  <div class="input-field">
    <label :for="id">{{ label }}</label>
    <input :type="type" :id="id" :placeholder="placeholder" :value="modelValue" @input="updateValue($event)"
      :autocomplete="autocomplete" />
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    label: {
      type: String,
      required: true
    },
    id: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: "text"
    },
    placeholder: {
      type: String,
      default: ""
    },
    modelValue: {
      type: String,
      default: ""
    },
    autocomplete: {
      type: String,
      default: ""
    }
  },
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    }
  }
};
</script>

<style scoped>
.input-field {
  margin-bottom: 15px;
}

.input-field input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-field label {
  font-weight: bold;
}
</style>

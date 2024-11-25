<script>
export default {
    name: "InputPassword",
    props: {
        label: String,
        id: String,
        placeholder: String,
        modelValue: String,
        required: {
            Boolean,
            default: true
        },
        disabled: {
            Boolean,
            default: false
        },
    },
    data() {
        return {
            isPasswordVisible: false,
        };
    },
    computed: {
        inputType() {
            return this.isPasswordVisible ? "text" : "password";
        },
    },
    methods: {
        updateValue(event) {
            this.$emit("update:modelValue", event.target.value);
        },
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
        },
    },
};
</script>

<template>
    <div class="input-password">
        <label :for="id">{{ label }}</label>
        <span v-if="required" class="required-indicator">*</span>

        <div class="input-wrapper">
            <input :type="inputType" :id="id" :value="modelValue" @input="updateValue" :placeholder="placeholder"
                autocomplete="current-password" :required="required" :disabled="disabled" />
            <button v-if="!disabled" type="button" @click="togglePasswordVisibility" class="toggle-password">
                <span class="material-icons">
                    {{ isPasswordVisible ? 'visibility_off' : 'visibility' }}
                </span>
            </button>
        </div>
    </div>
</template>

<style scoped>
button.toggle-password {
    position: absolute;
    right: 0.5rem;
    background: transparent;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    height: 100%;
}

button.toggle-password .material-icons {
    color: #888;
    font-size: 20px;
}
</style>

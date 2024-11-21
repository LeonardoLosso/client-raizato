<template>
    <div class="input-password">
        <label :for="id">{{ label }}</label>
        <div class="input-wrapper">
            <input :type="inputType" :id="id" :value="modelValue" @input="updateValue" :placeholder="placeholder"
                autocomplete="current-password" />
            <button type="button" @click="togglePasswordVisibility" class="toggle-password">
                <span class="material-icons">
                    {{ isPasswordVisible ? 'visibility_off' : 'visibility' }}
                </span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "InputPassword",
    props: {
        label: String,
        id: String,
        placeholder: String,
        modelValue: String,
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

<style scoped>
.input-wrapper {
    display: flex;
    align-items: center;
    position: relative;
}

input {
    width: 100%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

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

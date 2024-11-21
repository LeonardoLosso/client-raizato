<template>
    <button :class="['btn', type, { loading }]" @click="handleClick" :disabled="loading">
        <template v-if="loading">
            <span class="spinner"></span>
        </template>
        <template v-else>
            <slot></slot>
        </template>
    </button>
</template>

<script>
export default {
    name: "ButtonComponent",
    props: {
        type: {
            type: String,
            default: "primary"
        },
        loading: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            if (!this.loading) {
                this.$emit("click");
            }
        }
    }
};
</script>

<style scoped>
.btn {
    padding: 12px 24px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
}

.btn.primary {
    background-color: #007bff;
    color: white;
}

.btn.primary:hover {
    background-color: #0056b3;
}

.btn:disabled {
    background-color: #a3a3a3;
    cursor: not-allowed;
}

.spinner {
    border: 2px solid #f3f3f3;
    border-top: 2px solid #fff;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>

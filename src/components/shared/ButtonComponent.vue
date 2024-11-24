<script>
export default {
    name: "ButtonComponent",
    props: {
        label: String,
        type: {
            type: String,
            default: "primary"
        },
        loading: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        handleClick() {
            if (!this.loading) {
                this.$emit("clickEvent");
            }
        }
    }
};
</script>

<template>
    <button :class="['btn', type, { loading }]" @click="handleClick" :disabled="loading || disabled">
        <template v-if="loading">
            <span class="spinner"></span>
        </template>
        <template v-else>
            <slot>{{ label }}</slot>
        </template>
    </button>
</template>

<style scoped>
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Movement } from '@/core/types/products';
import { createMovement } from '@/core/http/services/movementService';
import MovementForm from '@/components/Product/MovementForm.vue';

export default defineComponent({
    name: 'CreateMovementPage',
    components: {
        MovementForm,
    },
    setup() {
        const isSaving = ref(false);
        const router = useRouter();

        const handleSubmit = async (formData: Movement) => {
            isSaving.value = true;
            console.log(formData);
            const res = await createMovement(formData);
            if (res) {
                router.push({ name: 'Movements' });
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        return {
            isSaving,
            handleSubmit,
            handleCancel,
        };
    },
});
</script>

<template>
    <div class="centered-container">
        <MovementForm :isEditing="false" @saveMovement="handleSubmit" @cancel="handleCancel" :isSaving="isSaving" />
    </div>
</template>

<style scoped>
.centered-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}
</style>

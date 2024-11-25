<script lang="ts">
import MovementForm from '@/components/Product/MovementForm.vue';
import { getMovement, updateMovement } from '@/core/http/services/movementService';
import { Movement } from '@/core/types/products';
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
    name: 'UpdateMovementPage',
    components: {
        MovementForm,
    },
    setup() {
        const movement = ref<Movement | null>(null);
        const isSaving = ref(false);
        const isDeleting = ref(false);

        const route = useRoute();
        const router = useRouter();
        const movementId = computed(() => {
            const id = route.params.id;
            return Array.isArray(id) ? id[0] : id;
        });

        const fetchMovement = async () => {
            const response = await getMovement(movementId.value);
            movement.value = response;
        };

        const handleSubmit = async (formData: Movement) => {
            isSaving.value = true;
            if (!(JSON.stringify(movement.value) === JSON.stringify(formData))) {
                await updateMovement(formData);
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        // const handleDelete = async (id: number) => {
        //     isDeleting.value = true;
        //     const res = await deleteMovement(id);
        //     if (res) router.push('/movements');
        //     isDeleting.value = false;
        // };

        onMounted(() => {
            fetchMovement();
        });

        return {
            movement,
            isSaving,
            isDeleting,
            handleSubmit,
            handleCancel,
            // handleDelete,
        };
    },
});
</script>

<template>
    <div class="centered-container">
        <MovementForm v-if="movement" :movement="movement" :isEditing="true" @saveMovement="handleSubmit"
            @cancel="handleCancel" :isDeleting="isDeleting" :isSaving="isSaving" />
    </div>
</template>

<style scoped>
.centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    flex-direction: column;
}
</style>

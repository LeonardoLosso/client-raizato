<script lang="ts">
import CategoryForm from '@/components/Product/CategoryForm.vue';
import { createCategory } from '@/core/http/services/categoryService';
import { Category } from '@/core/types/products';
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';


export default defineComponent({
    name: 'CreateCategoryPage',
    components: {
        CategoryForm
    },
    setup() {
        const isSaving = ref(false);

        const router = useRouter();

        const handleSubmit = async (formData: Category) => {
            isSaving.value = true;
            const res = await createCategory(formData);
            if (res) {
                router.push({ name: 'Categories' });
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        onMounted(() => {
        });

        return {
            isSaving,
            handleSubmit,
            handleCancel,
        };
    }
});
</script>

<template>
    <div class="centered-container">
        <CategoryForm :isEditing="false" @saveCategory="handleSubmit" @cancel="handleCancel" :isSaving="isSaving" />
    </div>
</template>

<style scoped></style>

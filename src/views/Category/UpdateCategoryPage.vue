<script lang="ts">
import CategoryForm from '@/components/Product/CategoryForm.vue';
import { deleteCategory, getCategory, updateCategory } from '@/core/http/services/categoryService';
import { Category } from '@/core/types/products';
import { computed, defineComponent, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';


export default defineComponent({
    name: 'UpdateCategoryPage',
    components: {
        CategoryForm
    },
    setup() {
        const category = ref<Category | null>(null);
        const isSaving = ref(false);
        const isDeleting = ref(false);

        const route = useRoute();
        const router = useRouter();
        const categoryId = computed(() => {
            const id = route.params.id;
            return Array.isArray(id) ? id[0] : id;
        });

        const fetchCategoryProfile = async () => {
            const response = await getCategory(categoryId.value);
            category.value = response;
        };

        const handleSubmit = async (formData: Category) => {
            isSaving.value = true;
            if (!(JSON.stringify(category.value) === JSON.stringify(formData))) {
                await updateCategory(formData);
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        const handleDelete = async (id: number) => {
            isDeleting.value = true;
            const res = await deleteCategory(id);
            if (res) router.push({ name: 'Categories' });
            isDeleting.value = false;
        };

        onMounted(() => {
            fetchCategoryProfile();
        });

        return {
            category,
            isSaving,
            isDeleting,
            handleSubmit,
            handleCancel,
            handleDelete
        };
    }
});
</script>

<template>
    <div class="centered-container">
        <CategoryForm v-if="category" :category="category" :isEditing="true" @saveCategory="handleSubmit"
            @cancel="handleCancel" @delete="handleDelete" :isDeleting="isDeleting" :isSaving="isSaving" />
    </div>
</template>

<style scoped></style>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Product } from '@/core/types/products';
import { createProduct } from '@/core/http/services/productService';
import ProductForm from '@/components/Product/ProductForm.vue';

export default defineComponent({
    name: 'CreateProductPage',
    components: {
        ProductForm
    },
    setup() {
        const isSaving = ref(false);
        const router = useRouter();

        const handleSubmit = async (formData: Product) => {
            isSaving.value = true;
            console.log(formData)
            const res = await createProduct(formData);
            if (res) {
                router.push({ name: 'Products' });
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        return {
            isSaving,
            handleSubmit,
            handleCancel
        };
    }
});
</script>

<template>
    <div class="centered-container">
        <ProductForm :isEditing="false" @saveProduct="handleSubmit" @cancel="handleCancel" :isSaving="isSaving" />
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

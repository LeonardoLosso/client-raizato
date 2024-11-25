<script lang="ts">
import ProductForm from '@/components/Product/ProductForm.vue';
import { deleteProduct, getProduct, updateProduct } from '@/core/http/services/productService';
import { Product } from '@/core/types/products';
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';


export default defineComponent({
    name: 'UpdateProductPage',
    components: {
        ProductForm
    },
    setup() {
        const product = ref<Product | null>(null);
        const isSaving = ref(false);
        const isDeleting = ref(false);

        const route = useRoute();
        const router = useRouter();
        const productId = computed(() => {
            const id = route.params.id;
            return Array.isArray(id) ? id[0] : id;
        });

        const fetchProduct = async () => {
            const response = await getProduct(productId.value);
            product.value = response;
        };

        const handleSubmit = async (formData: Product) => {
            isSaving.value = true;
            if (!(JSON.stringify(product.value) === JSON.stringify(formData))) {
                await updateProduct(formData);
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        const handleDelete = async (id: number) => {
            isDeleting.value = true;
            const res = await deleteProduct(id);
            if (res) router.push('/products');
            isDeleting.value = false;
        };

        onMounted(() => {
            fetchProduct();
        });

        return {
            product,
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
        <ProductForm v-if="product" :product="product" :isEditing="true" @saveProduct="handleSubmit"
            @cancel="handleCancel" @delete="handleDelete" :isDeleting="isDeleting" :isSaving="isSaving" />
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

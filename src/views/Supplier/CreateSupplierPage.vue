<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { Supplier } from '@/core/types/suppliers';
import { createSupplier } from '@/core/http/services/supplierService';
import SupplierForm from '@/components/Supplier/SupplierForm.vue';

export default defineComponent({
    name: 'CreateSupplierPage',
    components: {
        SupplierForm
    },
    setup() {
        const isSaving = ref(false);

        const router = useRouter();

        const handleSubmit = async (formData: Supplier) => {
            isSaving.value = true;
            const res = await createSupplier(formData);
            if (res) {
                router.push({ name: 'Suppliers' });
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
        <SupplierForm :isEditing="false" @saveSupplier="handleSubmit" @cancel="handleCancel" :isSaving="isSaving" />
    </div>
</template>

<style scoped></style>

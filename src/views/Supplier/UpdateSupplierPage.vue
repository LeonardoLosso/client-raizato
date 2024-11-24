<script lang="ts">
import SupplierForm from '@/components/Supplier/SupplierForm.vue';
import { deleteSupplier, getSupplier, updateSupplier } from '@/core/http/services/supplierService';
import { Supplier } from '@/core/types/suppliers';
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

export default defineComponent({
    name: 'UpdateSupplierPage',
    components: {
        SupplierForm
    },
    setup() {
        const supplier = ref<Supplier | null>(null);
        const isSaving = ref(false);
        const isDeleting = ref(false);

        const route = useRoute();
        const router = useRouter();
        const supplierId = computed(() => {
            const id = route.params.id;
            return Array.isArray(id) ? id[0] : id;
        });

        const fetchSupplierProfile = async () => {
            const response = await getSupplier(supplierId.value);
            supplier.value = response;
        };

        const handleSubmit = async (formData: Supplier) => {
            isSaving.value = true;
            if (!(JSON.stringify(supplier.value) === JSON.stringify(formData))) {
                await updateSupplier(formData);
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        const handleDelete = async (id: number) => {
            isDeleting.value = true;
            const res = await deleteSupplier(id);
            if (res) router.push({ name: 'Suppliers' });
            isDeleting.value = false;
        };

        onMounted(() => {
            fetchSupplierProfile();
        });

        return {
            supplier,
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
        <SupplierForm v-if="supplier" :supplier="supplier" :isEditing="true" @saveSupplier="handleSubmit"
            @cancel="handleCancel" @delete="handleDelete" :isDeleting="isDeleting" :isSaving="isSaving" />
    </div>
</template>

<style scoped></style>

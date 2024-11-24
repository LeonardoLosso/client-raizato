<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import { listSuppliers } from '@/core/http/services/supplierService';

import { Supplier } from '@/core/types/suppliers';
import GenericTable from '@/components/shared/GenericTable.vue';
import { encodeBase64 } from '@/core/utils/functions';
import router from '@/core/router';

export default defineComponent({
    name: 'SupplierPage',
    components: { GenericTable },
    setup() {
        const suppliers = ref<Supplier[]>([]);
        const headerMap = {
            'Nome': 'nome',
            'CNPJ': 'cnpj',
            'Contato': 'contato'
        };

        const fetchSuppliers = async () => {
            try {
                suppliers.value = await listSuppliers();
            } catch (error) {
                console.error('Erro ao carregar fornecedores', error);
            }
        };

        onMounted(() => {
            fetchSuppliers();
        });

        const onRowDoubleClick = (row: Supplier) => {
            if (!(row?.id)) return;

            const id = encodeBase64(row.id.toString());

            router.push({ name: 'UpdateSupplier', params: { id } });
        };

        return {
            suppliers,
            headerMap,
            onRowDoubleClick
        };
    }
});
</script>

<template>
    <div>
        <GenericTable title="Fornecedores" :headers="['Nome', 'CNPJ', 'Contato']" :data="suppliers"
            :headerToPropertyMap="headerMap" @rowDoubleClicked="onRowDoubleClick" />
    </div>
</template>

<style scoped>
.supplier-page {
    padding: 1rem;
}
</style>

<style>
td.cnpj {
    font-weight: bold;
    text-align: center;
}

.container {
    max-width: fit-content !important;
}
</style>

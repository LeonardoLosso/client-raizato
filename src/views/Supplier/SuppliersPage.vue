<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import { getSuppliers } from '@/core/http/services/supplierService';

import { Supplier } from '@/core/types/suppliers';
import GenericTable from '@/components/shared/GenericTable.vue';

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
                suppliers.value = await getSuppliers();
            } catch (error) {
                console.error('Erro ao carregar fornecedores', error);
            }
        };

        onMounted(() => {
            fetchSuppliers();
        });

        const onRowDoubleClick = (row: Supplier) => {
            if (!row?.id) return;

            console.log('Fornecedor clicado:', row);
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

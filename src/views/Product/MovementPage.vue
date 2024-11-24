<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import GenericTable from '@/components/shared/GenericTable.vue';
import { Movement } from '@/core/types/products';
import { getMovements } from '@/core/http/services/productService';

export default defineComponent({
    name: 'MovementPage',
    components: { GenericTable },
    setup() {
        const movements = ref<Movement[]>([]);
        const headerMap = {
            'Tipo': 'movementType',
            'Produto': 'productName',
            'Categoria': 'categoryName',
            'Quantidade': 'quantity',
            'Valor Unitário': 'unitPrice',
            'Valor Total': 'totalPrice',
            'Data': 'date',
            'Observação': 'description'
        };

        const fetchMovements = async () => {
            try {
                movements.value = await getMovements();
            } catch (error) {
                console.error('Erro ao carregar movimentações', error);
            }
        };

        onMounted(() => {
            fetchMovements();
        });

        const onRowDoubleClick = (row: Movement) => {
            if (!row?.id) return;
            console.log('Movimentação clicada:', row);
        };

        return {
            movements,
            headerMap,
            onRowDoubleClick
        };
    }
});
</script>

<template>
    <div>
        <GenericTable title="Movimentações"
            :headers="['Tipo', 'Produto', 'Categoria', 'Quantidade', 'Valor Unitário', 'Valor Total', 'Data', 'Observação',]"
            :data="movements" :headerToPropertyMap="headerMap" @rowDoubleClicked="onRowDoubleClick" />
    </div>
</template>

<style scoped>
.movement-page {
    padding: 1rem;
}
</style>

<style>
.container {
    max-width: fit-content !important;
}
</style>

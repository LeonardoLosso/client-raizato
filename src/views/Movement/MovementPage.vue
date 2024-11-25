<script lang="ts">
import { defineComponent, ref, onMounted, watch } from 'vue';
import GenericTable from '@/components/shared/GenericTable.vue';
import { Movement } from '@/core/types/products';
import { filterByProduct, listMovements } from '@/core/http/services/movementService';
import { encodeBase64 } from '@/core/utils/functions';
import router from '@/core/router';
import DropdownBase from '@/components/shared/input/DropdownBase.vue';

export default defineComponent({
    name: 'MovementPage',
    components: {
        GenericTable,
        DropdownBase,
    },
    setup() {
        const movements = ref<Movement[]>([]);
        const searchQuery = ref('');
        const headerMap = {
            'Tipo': 'movementType',
            'Produto': 'productName',
            'Categoria': 'categoryName',
            'Quantidade': 'quantity',
            'Valor Unitário': 'unitPrice',
            'Valor Total': 'totalPrice',
            'Data': 'date',
            'Observação': 'description',
        };

        const fetchMovements = async () => {
            try {
                movements.value = await listMovements();
            } catch (error) {
                console.error('Erro ao carregar movimentações', error);
            }
        };

        onMounted(() => {
            fetchMovements();
        });

        const onRowDoubleClick = (row: Movement) => {
            if (!row?.id) return;
            const id = encodeBase64(row.id.toString());
            router.push({ name: 'UpdateMovement', params: { id } });
        };

        const filterMovement = async (query: string) => {
            const response = await filterByProduct(query);
            if (!response) return;
            movements.value = response;
        };

        watch(searchQuery, (newValue) => {
            if (newValue) return filterMovement(newValue);

            fetchMovements();
        });

        return {
            movements,
            headerMap,
            searchQuery,
            onRowDoubleClick,
        };
    },
});
</script>

<template>
    <div class="">
        <div class="search-bar">
            <DropdownBase label="Produto" id="fornecedorId" :apiUrl="'/produtos'" v-model="searchQuery"
                class="search-input" :hide="true" />
        </div>
        <GenericTable title="Movimentações"
            :headers="['Tipo', 'Produto', 'Categoria', 'Quantidade', 'Valor Unitário', 'Valor Total', 'Data', 'Observação',]"
            :data="movements" :headerToPropertyMap="headerMap" @rowDoubleClicked="onRowDoubleClick" />
    </div>
</template>

<style scoped>
.movement-page {
    padding: 1rem;
}

.search-bar {
    display: flex;
    justify-content: flex-start;
}

.search-input {
    width: 30%;
    border-radius: 8px !important;
    font-size: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.container {
    margin: 0 !important;
    max-width: fit-content !important;
}
</style>
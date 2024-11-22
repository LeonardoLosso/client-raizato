<template>
    <div class="home-container">
        <div class="table-section">
            <GenericTable :title="'Produtos com Estoque Baixo'" :headers="['Produto', 'Estoque', 'Prioridade']"
                :data="lowStockData" />
            <GenericTable :title="'Produtos Próximos do Vencimento'"
                :headers="['Produto', 'Data de Validade', 'Quantidade']" :data="expiringStockData" />
        </div>
    </div>
</template>

<script lang="ts">
import GenericTable from '@/components/shared/GenericTable.vue';
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'HomePage',
    components: {
        GenericTable
    },
    data() {
        return {
            lowStockData: [
                ['Produto 1', '10', 'Alta'],
                ['Produto 2', '5', 'Média'],
                ['Produto 3', '2', 'Baixa']
            ],
            expiringStockData: [
                ['Produto A', '2024-12-01', '50'],
                ['Produto B', '2024-11-25', '30'],
                ['Produto C', '2024-11-30', '20']
            ]
        };
    }
});
</script>

<style scoped>
.home-container {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.table-section {
    display: flex;
    flex-direction: column;
    gap: 20px;
    flex: 1;
}
</style>
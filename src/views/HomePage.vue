<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import GenericTable from '@/components/shared/GenericTable.vue';
import { Product } from '@/core/types/products';
import { listProducts } from '@/core/http/services/productService';

export default defineComponent({
    name: 'HomePage',
    components: {
        GenericTable
    },
    setup() {
        const lowStockData = ref<Product[]>([]);
        const expiringStockData = ref<Product[]>([]);

        const headerToPropertyMap = {
            'Produto': 'name',
            'Validade': 'expiryDate',
            'Estoque': 'stock',
            'Minimo': 'minStock',
            'Categoria': 'categoryName',
            'Custo': 'costPrice',
            'Venda': 'salePrice',
            'Código': 'code',
            'Fornecedor': 'fornecedorName',
            'Descrição': 'description'
        };

        const fetchProducts = async () => {
            try {
                lowStockData.value = await listProducts({ low_stock: true });
                expiringStockData.value = await listProducts({});
            } catch (error) {
                console.error('Erro ao carregar produtos', error);
            }
        };

        onMounted(() => {
            fetchProducts();
        });

        return {
            lowStockData,
            expiringStockData,
            headerToPropertyMap
        };
    }
});
</script>

<template>
    <div>
        <div class="centered-container">
            <GenericTable :title="'Produtos com Estoque Baixo'"
                :headers="['Produto', 'Estoque', 'Minimo', 'Categoria', 'Custo', 'Venda']" :data="lowStockData"
                :headerToPropertyMap="headerToPropertyMap" class="tabela-min" />
            <GenericTable :title="'Produtos Próximos do Vencimento'"
                :headers="['Produto', 'Validade', 'Estoque', 'Categoria', 'Custo', 'Venda']" :data="expiringStockData"
                :headerToPropertyMap="headerToPropertyMap" />
        </div>
    </div>
</template>

<style scoped>
.centered-container {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    width: 100%;
}

.centered-container>* {
    flex: 1 1 45%;
    min-width: 300px;
}

@media (max-width: 768px) {
    .centered-container>* {
        flex: 1 1 100%;
    }
}

.tabela-min.estoque td.estoque,
.tabela-min.estoque td.minimo {
    font-weight: bold !important;
}
</style>

<style>
td.custo,
td.venda,
td.valor,
td.validade,
.tabela-min.estoque td.estoque,
.tabela-min.estoque td.minimo {
    font-weight: bold !important;
}

td.custo::before,
td.venda::before,
td.valor::before {
    content: "R$ ";
}
</style>

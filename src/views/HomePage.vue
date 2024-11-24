<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import GenericTable from '@/components/shared/GenericTable.vue';
import { Product } from '@/core/types/products';
import { getProducts } from '@/core/http/services/productService';

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
                lowStockData.value = await getProducts({ low_stock: true });
                expiringStockData.value = await getProducts({});
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
                :headerToPropertyMap="headerToPropertyMap" />
            <GenericTable :title="'Produtos Próximos do Vencimento'"
                :headers="['Produto', 'Validade', 'Estoque', 'Categoria', 'Custo', 'Venda']" :data="expiringStockData"
                :headerToPropertyMap="headerToPropertyMap" />
        </div>
    </div>
</template>

<style scoped>
.centered-container {
    display: flex;
    justify-content: space-around;
    gap: 10px;
    flex-wrap: wrap;
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
</style>

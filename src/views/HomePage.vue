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
            'Data de Validade': 'expiryDate',
            'Estoque': 'stock',
            'Minimo': 'minStock',
            'Categoria': 'categoryName',
            'Preço Custo': 'costPrice',
            'Preço Venda': 'salePrice',
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
                :headers="['Produto', 'Estoque', 'Minimo', 'Categoria', 'Preço Custo', 'Preço Venda']"
                :data="lowStockData" :headerToPropertyMap="headerToPropertyMap" />
            <GenericTable :title="'Produtos Próximos do Vencimento'"
                :headers="['Produto', 'Data de Validade', 'Estoque', 'Categoria', 'Preço Custo', 'Preço Venda']"
                :data="expiringStockData" :headerToPropertyMap="headerToPropertyMap" />
        </div>
    </div>
</template>

<style scoped>
.centered-container {
    display: flex;
    justify-content: space-around;
    gap: 10px;
}
</style>

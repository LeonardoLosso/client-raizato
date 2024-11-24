<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { getProducts } from '@/core/http/services/productService';
import { Product } from '@/core/types/products';
import GenericTable from '@/components/shared/GenericTable.vue';

export default defineComponent({
    name: 'ProductPage',
    components: { GenericTable },
    setup() {
        const products = ref<Product[]>([]);
        const headerMap = {
            'Nome': 'name',
            'Código': 'code',
            'Categoria': 'categoryName',
            'Fornecedor': 'fornecedorName',
            'Preço de Custo': 'costPrice',
            'Preço de Venda': 'salePrice',
            'Estoque Mínimo': 'minStock',
            'Estoque Atual': 'stock',
            'Data de Validade': 'expiryDate'
        };

        const fetchProducts = async () => {
            try {
                products.value = await getProducts();
            } catch (error) {
                console.error('Erro ao carregar produtos', error);
            }
        };

        onMounted(() => {
            fetchProducts();
        });

        const onRowDoubleClick = (row: Product) => {
            if (!row?.id) return;
            console.log('Produto clicado:', row);
        };

        return {
            products,
            headerMap,
            onRowDoubleClick
        };
    }
});
</script>

<template>
    <div>
        <GenericTable title="Produtos"
            :headers="['Nome', 'Código', 'Categoria', 'Fornecedor', 'Preço de Custo', 'Preço de Venda', 'Estoque Mínimo', 'Estoque Atual', 'Data de Validade']"
            :data="products" :headerToPropertyMap="headerMap" @rowDoubleClicked="onRowDoubleClick" />
    </div>
</template>

<style scoped>
.product-page {
    padding: 1rem;
}
</style>

<style>
td.salePrice,
td.costPrice {
    font-weight: bold;
    text-align: center;
}

.container {
    max-width: fit-content !important;
}
</style>

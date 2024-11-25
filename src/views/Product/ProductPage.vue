<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { listProducts } from '@/core/http/services/productService';
import { Product } from '@/core/types/products';
import GenericTable from '@/components/shared/GenericTable.vue';
import { encodeBase64 } from '@/core/utils/functions';
import router from '@/core/router';
import SearchBox from '@/components/shared/input/SearchBox.vue';

export default defineComponent({
    name: 'ProductPage',
    components: { GenericTable, SearchBox },
    setup() {
        const products = ref<Product[]>([]);
        const searchQuery = ref<string>('');
        const headerMap = {
            'Nome': 'name',
            'Código': 'code',
            'Categoria': 'categoryName',
            'Fornecedor': 'fornecedorName',
            'Preço de Custo': 'costPrice',
            'Preço de Venda': 'salePrice',
            'Estoque Mínimo': 'minStock',
            'Estoque Atual': 'stock',
            'Validade': 'expiryDate'
        };

        const fetchProducts = async () => {
            try {
                products.value = await listProducts();
            } catch (error) {
                console.error('Erro ao carregar produtos', error);
            }
        };

        const filteredProducts = computed(() => {
            if (!searchQuery.value) return products.value;

            return products.value.filter(product =>
                Object.values(product)
                    .some(value =>
                        String(value).toLowerCase().includes(searchQuery.value.toLowerCase())
                    )
            );
        });

        const onRowDoubleClick = (row: Product) => {
            if (!(row?.id)) return;

            const id = encodeBase64(row.id.toString());
            router.push({ name: 'UpdateProduct', params: { id } });
        };

        onMounted(() => {
            fetchProducts();
        });

        return {
            products,
            filteredProducts,
            headerMap,
            searchQuery,
            onRowDoubleClick
        };
    }
});
</script>

<template>
    <div class="product-page">
        <div class="controls">
            <SearchBox v-model:searchQuery="searchQuery" />
        </div>
        <GenericTable title="Produtos"
            :headers="['Nome', 'Código', 'Categoria', 'Fornecedor', 'Preço de Custo', 'Preço de Venda', 'Estoque Mínimo', 'Estoque Atual', 'Validade']"
            :data="filteredProducts" :headerToPropertyMap="headerMap" @rowDoubleClicked="onRowDoubleClick" />
    </div>
</template>
<style scoped>
.product-page {
    padding: 1rem;
}

.controls {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 1rem;
}

.container {
    margin: 0 !important;
}
</style>

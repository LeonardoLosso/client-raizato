<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import GenericTable from '@/components/shared/GenericTable.vue';
import { getCategories } from '@/core/http/services/productService';
import { Category } from '@/core/types/products';

export default defineComponent({
    name: 'CategoryPage',
    components: { GenericTable },
    setup() {
        const categories = ref<Category[]>([]);
        const headerMap = {
            'Nome': 'name',
            'Descrição': 'description'
        };

        const fetchCategories = async () => {
            try {
                categories.value = await getCategories();
            } catch (error) {
                console.error('Erro ao carregar categorias', error);
            }
        };

        onMounted(() => {
            fetchCategories();
        });

        const onRowDoubleClick = (row: Category) => {
            if (!row?.id) return;
            console.log('Categoria clicada:', row);
        };

        return {
            categories,
            headerMap,
            onRowDoubleClick
        };
    }
});
</script>

<template>
    <div>
        <GenericTable title="Categorias" :headers="['Nome', 'Descrição']" :data="categories"
            :headerToPropertyMap="headerMap" @rowDoubleClicked="onRowDoubleClick" />
    </div>
</template>

<style scoped>
.category-page {
    padding: 1rem;
}
</style>

<style>
.container {
    max-width: fit-content !important;
}
</style>

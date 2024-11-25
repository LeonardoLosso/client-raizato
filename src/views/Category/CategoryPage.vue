<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import GenericTable from '@/components/shared/GenericTable.vue';
import { Category } from '@/core/types/products';
import { listCategories } from '@/core/http/services/categoryService';
import { encodeBase64 } from '@/core/utils/functions';
import router from '@/core/router';

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
                categories.value = await listCategories();
            } catch (error) {
                console.error('Erro ao carregar categorias', error);
            }
        };

        onMounted(() => {
            fetchCategories();
        });

        const onRowDoubleClick = (row: Category) => {
            if (!row?.id) return;
            const id = encodeBase64(row.id.toString());

            router.push({ name: 'UpdateCategory', params: { id } });
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

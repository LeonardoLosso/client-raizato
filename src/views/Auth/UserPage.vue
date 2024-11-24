<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

import GenericTable from '@/components/shared/GenericTable.vue';
import { getUsers } from '@/core/http/services/authService';
import { User } from '@/core/types/auth';
import router from '@/core/router';
import { encodeBase64 } from '@/core/utils/functions';

export default defineComponent({
    name: 'ExamplePage',
    components: { GenericTable },
    setup() {
        const users = ref<User[]>([]);
        const headerMap = {
            'Nome': 'fullName',
            'Papel': 'role',
            'Telefone': 'phone',
            'Email': 'email'
        };

        const fetchUsers = async () => {
            try {
                users.value = await getUsers();


            } catch (error) {
                console.error('Erro ao carregar usuários', error);
            }
        };

        onMounted(() => {
            fetchUsers();
        });

        const onRowDoubleClick = (row: User) => {
            if (!(row?.id)) return;

            const id = encodeBase64(row.id.toString());

            router.push({ name: 'Profile', params: { id } });
        };

        return {
            users,
            headerMap,
            onRowDoubleClick
        };
    }
});
</script>

<template>
    <div>
        <GenericTable title="Usuários" :headers="['Nome', 'Papel', 'Telefone', 'Email']" :data="users"
            :headerToPropertyMap="headerMap" @rowDoubleClicked="onRowDoubleClick" />
    </div>
</template>

<style scoped>
.user-page {
    padding: 1rem;
}
</style>

<style>
td.papel {
    font-weight: bold;
    text-align: center;
}

.container{
    max-width: fit-content !important;
}
</style>

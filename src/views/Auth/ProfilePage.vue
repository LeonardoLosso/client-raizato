<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import UserForm from '@/components/auth/UserForm.vue';
import { deleteUser, getProfile, logout, updateUser } from '@/core/http/services/authService';
import { User } from '@/core/types/auth';

export default defineComponent({
    name: 'ProfilePage',
    components: {
        UserForm
    },
    setup() {
        const user = ref<User | null>(null);
        const isSaving = ref(false);
        const isDeleting = ref(false);

        const route = useRoute();
        const router = useRouter();
        const userId = computed(() => {
            const id = route.params.id;
            return Array.isArray(id) ? id[0] : id;
        });

        const fetchUserProfile = async () => {
            const response = await getProfile(userId.value);
            user.value = response;
        };

        const handleSubmit = async (formData: User) => {
            isSaving.value = true;
            if (!(JSON.stringify(user.value) === JSON.stringify(formData))) {
                await updateUser(formData);
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        const handleDelete = async (id: number) => {
            isDeleting.value = true;
            const res = await deleteUser(id);
            if (res && id == 0) logout(router);
            isDeleting.value = false;
        };

        onMounted(() => {
            fetchUserProfile();
        });

        return {
            user,
            isSaving,
            isDeleting,
            handleSubmit,
            handleCancel,
            handleDelete
        };
    }
});
</script>

<template>
    <div class="centered-container">
        <UserForm v-if="user" :user="user" :isEditing="true" @saveUser="handleSubmit" @cancel="handleCancel"
            @delete="handleDelete" :isDeleting="isDeleting" :isSaving="isSaving" />
    </div>
</template>



<style scoped></style>

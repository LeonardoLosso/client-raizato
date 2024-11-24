<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import UserForm from '@/components/auth/UserForm.vue';
import { User } from '@/core/types/auth';
import { createUser } from '@/core/http/services/authService';

export default defineComponent({
    name: 'CreateProfilePage',
    components: {
        UserForm
    },
    setup() {
        const user = ref<User | null>(null);
        const isSaving = ref(false);

        const router = useRouter();


        const handleSubmit = async (formData: User) => {
            isSaving.value = true;
            const res = await createUser(formData);
            if (res) {
                router.push({ name: 'Users' });
            }
            isSaving.value = false;
        };

        const handleCancel = () => {
            router.back();
        };

        onMounted(() => {
        });

        return {
            user,
            isSaving,
            handleSubmit,
            handleCancel,
        };
    }
});
</script>

<template>
    <div class="centered-container">
        <UserForm :isEditing="false" @saveUser="handleSubmit" @cancel="handleCancel" :isSaving="isSaving" />
    </div>
</template>



<style scoped></style>

<script>
import UserForm from '@/components/auth/UserForm.vue';
import { getProfile } from '@/core/http/services/authService';

export default {
    name: 'UserProfilePage',
    components: {
        UserForm
    },
    data() {
        return {
            user: null,
            error: null,
            isSaving: false,
            isDeleting: false
        };
    },
    computed: {
        userId() {
            return this.$route.params.id;
        }
    },
    mounted() {
        this.fetchUserProfile();
    },
    methods: {
        async fetchUserProfile() {
            try {
                const response = await getProfile(this.$router, this.userId);
                this.user = response;
            } catch (err) {
                console.error('Erro ao carregar o perfil:', err);
                this.error = 'Erro ao carregar o perfil do usuário.';
            }
        },
        handleSubmit() {

        },
        handleCancel() {

        },
        handleDelete() {

        }
    }
};
</script>

<template>
    <div class="centered-container">
        <UserForm v-if="user" :user="user" :isEditing="true" @submit="handleSubmit" @cancel="handleCancel"
            @delete="handleDelete" :isDeleting="isDeleting" :isSaving="isSaving" />
    </div>
</template>

<style scoped></style>

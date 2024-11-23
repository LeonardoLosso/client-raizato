<script>
import ButtonComponent from '@/components/shared/ButtonComponent.vue';


export default {
    name: 'NotFoundPage',
    components: {
        ButtonComponent
    },
    methods: {
        handleClick() {
            this.$router.push({ name: 'Home' });
        }
    }
};
</script>

<template>
    <div class="centered-container container">
        <img src="https://http.cat/images/404.jpg" alt="Imagem gato 404" class="not-found-image" />
        <h1>Página Não Encontrada</h1>
        <p>A página que você está procurando não existe.</p>

        <ButtonComponent type="primary" @click="handleClick" label="Voltar para Home" />
    </div>
</template>

<style scoped>
.container {
    flex-direction: column;
    align-items: center;
    text-align: center;
    border: 0;
    box-shadow: none;
}

.not-found-image {
    max-width: 404px;
    height: auto;
    margin-bottom: 20px;
}
</style>
<script>

export default {
    name: 'NotFoundPage',
    methods: {
        goHome() {
            this.$router.push({ name: 'Home' });
        }
    }
};
</script>

<template>
    <div class="not-found-container">
        <img src="https://http.cat/images/404.jpg" alt="Imagem gato 404" class="not-found-image" />
        <h1>Página Não Encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        <button @click="goHome" class="go-home-button">Voltar para Home</button>
    </div>
</template>

<style scoped>
.not-found-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center;
}

.not-found-image {
    max-width: 404px;
    height: auto;
    margin-bottom: 20px;
}

.go-home-button {
    padding: 10px 20px;
    font-size: 16px;
    color: white;
    background-color: #007BFF;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.3s;
}

.go-home-button:hover {
    background-color: #0056b3;
}
</style>
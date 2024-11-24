<script>
import HeaderComponent from './components/shared/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'Login' && this.$route.name !== 'NotFound';
    }
  },
  mounted() {
    this.updateHeight();
    window.addEventListener('resize', this.updateHeight);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.updateHeight);
  },
  methods: {
    updateHeight() {
      const headerHeight = document.querySelector('header')?.offsetHeight || 0;
      this.$refs.centeredContainer.style.height = `calc(100vh - ${headerHeight + 10}px)`;
    }
  }
}
</script>

<template>
  <ToastifyContainer />
  <HeaderComponent v-if="showHeader" />
  <div ref="centeredContainer" class="centered-container-app">
    <router-view />
  </div>
</template>

<style scoped>
.centered-container-app {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
}
</style>

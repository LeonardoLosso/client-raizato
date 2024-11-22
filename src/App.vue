<script>
import HeaderComponent from './components/shared/HeaderComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent
  },
  computed: {
    showHeader() {
      return this.$route.name !== 'Login';
    }
  },
}
</script>

<template>
  <ToastifyContainer />
  <HeaderComponent v-if="showHeader" />
  <router-view />
</template>

<style></style>

import { createApp } from 'vue'
import App from './App.vue'
import { ToastifyContainer } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import router from './core/router';

import './assets/styles/global.css'
import api from './core/http/interceptors/httpRequest';

const app = createApp(App);

app.component('ToastifyContainer', ToastifyContainer);
app.config.globalProperties.$axios = api;

app.use(router);
app.mount('#app');
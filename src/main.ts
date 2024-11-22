import { createApp } from 'vue'
import App from './App.vue'
import { ToastifyContainer } from 'vue3-toastify';
import axios from 'axios';

import './core/http/interceptors/axiosInterceptor';
import 'vue3-toastify/dist/index.css';
import './assets/styles/global.css'
import router from './core/router';

const app = createApp(App);

app.component('ToastifyContainer', ToastifyContainer);
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
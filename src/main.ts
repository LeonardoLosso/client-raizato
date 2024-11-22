import { createApp } from 'vue'
import App from './App.vue'
import { ToastifyContainer } from 'vue3-toastify';
import axios from 'axios';
import 'vue3-toastify/dist/index.css';
import router from './core/router';

import './assets/styles/global.css'
import './core/http/interceptors/responseHandler';

const app = createApp(App);

app.component('ToastifyContainer', ToastifyContainer);
app.config.globalProperties.$axios = axios;

app.use(router);
app.mount('#app');
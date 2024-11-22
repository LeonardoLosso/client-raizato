import { createApp } from 'vue'
import App from './App.vue'
import { ToastifyContainer } from 'vue3-toastify';
import axios from 'axios';

import './http/interceptors/axiosInterceptor';
import 'vue3-toastify/dist/index.css';
import './assets/styles/global.css'

const app = createApp(App);

app.component('ToastifyContainer', ToastifyContainer);
app.config.globalProperties.$axios = axios;

app.mount('#app');
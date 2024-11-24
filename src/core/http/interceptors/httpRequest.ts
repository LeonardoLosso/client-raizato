import axios from 'axios';
import { toast } from 'vue3-toastify';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        if (config.url !== '/auth/login') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        if (response) {

            const method = response.config.method?.toLowerCase();

            if (method && ['post', 'put', 'delete'].includes(method)) {
                const { message } = response.data;
                toast.success(message || 'Operação realizada com sucesso!');
            }

            if (response.data) return response.data;

            return response;
        }
    },
    (error) => {
        if (error.response) {
            const message = error.response.data?.errors[0] ?? error.response.data?.message;
            toast.error(message || 'Erro desconhecido!');
        } else if (error.request) {
            toast.error('Sem resposta do servidor!');
        } else {
            toast.error('Erro ao configurar a requisição!');
        }
        return Promise.reject(error);
    }
);

export default api;

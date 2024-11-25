import axios from 'axios';
import { Id, toast } from 'vue3-toastify';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    }, timeout: 10000,
});

let toastLoadingId: Id;

api.interceptors.request.use(
    (config) => {
        toastLoadingId =
            toast('Carregando...', {
                theme: 'dark',
                type: 'loading',
                "dangerouslyHTMLString": true,
                "autoClose": 2000,
                "pauseOnFocusLoss": false,
            });

        if (config.url !== '/auth/login') {
            const token = localStorage.getItem('auth_token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => {
        if (toastLoadingId) {
            toast.update(toastLoadingId, {
                render: 'Erro ao configurar a requisição!',
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });
        }
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        if (toastLoadingId) {
            const { message } = response.data;
            const method = response.config.method?.toLowerCase();
            if (method && ['post', 'put', 'delete'].includes(method)) {
                toast.update(toastLoadingId, {
                    render: message || 'Ok',
                    type: 'success',
                    isLoading: false,
                    autoClose: 10,
                });
            } else {
                toast.update(toastLoadingId, { autoClose: 10 });
            }
        }


        if (response.data) return response.data;

        return response;
    },
    (error) => {
        if (toastLoadingId) {
            toast.update(toastLoadingId, {
                render: error.response?.data?.errors[0] || error.response?.data?.message || 'Erro desconhecido!',
                type: 'error',
                isLoading: false,
                autoClose: 5000,
            });
        }

        if (error.response) {
            if (error.response.status === 401) {
                window.location.href = '/auth/login';
            }

            const { message } = error.response.data?.message;
            toast.error(message || 'Erro desconhecido!', {
                theme: 'dark',
                "dangerouslyHTMLString": true,
                "autoClose": 2000,
                "pauseOnFocusLoss": false,
            });
        }
        return Promise.reject(error);
    }
);

export default api;

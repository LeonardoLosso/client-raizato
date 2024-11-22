import axios from 'axios';
import { toast } from 'vue3-toastify';

axios.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        }
        return response;
    },
    (error) => {
        if (error.response) {
            const { message } = error.response.data;
            return toast.error(message || 'Erro desconhecido!');
        }
        if (error.request)
            return toast.error('Sem resposta do servidor!');

        return toast.error('Erro ao configurar a requisição!');
    }
);

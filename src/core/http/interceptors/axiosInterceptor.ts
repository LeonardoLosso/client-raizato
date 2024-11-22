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
            toast.error(message || 'Erro desconhecido!');
        } else if (error.request) {
            toast.error('Sem resposta do servidor!');
        } else {
            toast.error('Erro ao configurar a requisição!');
        }
    }
);

import api from '../interceptors/httpRequest';

const BASE_URL = '/fornecedores/';

export const getSuppliers = async () => {
    try {
        const response =
            await api.get(BASE_URL);

        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
    }

};

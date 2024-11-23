import { Product, ProductParams } from '@/core/types/products';
import api from '../interceptors/httpRequest';


export const getProducts = async (productParams?: ProductParams): Promise<Product[]> => {
    const response =
        await api.get('/produtos', { params: productParams });
    return response.data.data;
};

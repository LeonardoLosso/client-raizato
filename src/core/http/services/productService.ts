import { Category, Movement, Product, ProductParams } from '@/core/types/products';
import api from '../interceptors/httpRequest';


export const getProducts = async (productParams?: ProductParams): Promise<Product[] | []> => {
    try {

        const response =
            await api.get('/produtos', { params: productParams });

        return response.data;
    } catch {
        return [];
    }
};

export const getCategories = async (): Promise<Category[]> => {
    try {

        const response =
            await api.get('/categorias');

        return response.data;
    } catch {
        return [];
    }
};

export const getMovements = async (): Promise<Movement[]> => {
    try {

        const response =
            await api.get('/estoque');

        return response.data;
    } catch {
        return [];
    }
};
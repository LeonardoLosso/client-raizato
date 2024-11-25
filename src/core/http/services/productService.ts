import { Category, Movement, Product, ProductParams } from '@/core/types/products';
import api from '../interceptors/httpRequest';
import { decodeBase64 } from '@/core/utils/functions';

const BASE_URL = '/produtos/';

export const listProducts = async (productParams?: ProductParams): Promise<Product[] | []> => {
    try {

        const response =
            await api.get(BASE_URL, { params: productParams });

        return response.data;
    } catch {
        return [];
    }
};

export const createProduct = async (product: Product) => {
    try {
        await api.post(BASE_URL, product);
        return true;
    } catch (error) {
        return null;
    }
};

export const getProduct = async (id: string | number = 0) => {
    try {
        if (!id) id = 0;
        if (typeof id === 'string') id = decodeBase64(id);

        const response = await api.get(BASE_URL + id);
        return response.data;
    } catch (error) {
        return false;

    }
};

export const updateProduct = async (product: Product) => {
    try {
        await api.put(BASE_URL + product.id, product);
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteProduct = async (id: number) => {
    try {
        await api.delete(BASE_URL + id);
        return true;
    } catch (error) {
        return false;
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
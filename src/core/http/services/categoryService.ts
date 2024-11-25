import { Category } from '@/core/types/products';
import api from '../interceptors/httpRequest';
import { decodeBase64 } from '@/core/utils/functions';

const BASE_URL = '/categorias/';

export const listCategories = async () => {
    try {
        const response =
            await api.get(BASE_URL);

        return response.data;
    } catch {
        return [];
    }
};

export const createCategory = async (category: Category) => {
    try {
        await api.post(BASE_URL, category);
        return true;
    } catch (error) {
        return null;
    }
};

export const getCategory = async (id: string | number = 0) => {
    try {
        if (!id) id = 0;
        if (typeof id === 'string') id = decodeBase64(id);

        const response = await api.get(BASE_URL + id);
        return response.data;
    } catch (error) {
        return false;

    }
};

export const updateCategory = async (category: Category) => {
    try {
        await api.put(BASE_URL + category.id, category);
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteCategory = async (id: number) => {
    try {
        await api.delete(BASE_URL + id);
        return true;
    } catch (error) {
        return false;
    }
};
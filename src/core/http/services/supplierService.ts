import { Supplier } from '@/core/types/suppliers';
import api from '../interceptors/httpRequest';
import { decodeBase64 } from '@/core/utils/functions';

const BASE_URL = '/fornecedores/';

export const listSuppliers = async () => {
    try {
        const response =
            await api.get(BASE_URL);

        return response.data;
    } catch (error) {
        return [];
    }

};

export const getSupplier = async (id: string | number = 0) => {
    try {
        if (!id) id = 0;
        if (typeof id === 'string') id = decodeBase64(id);

        const response = await api.get(BASE_URL + id);
        return response.data;
    } catch (error) {
        return null;
    }
};

export const createSupplier = async (supplier: Supplier) => {
    try {
        await api.post(BASE_URL, supplier);
        return true;
    } catch (error) {
        return null;
    }
};

export const updateSupplier = async (supplier: Supplier) => {
    try {
        await api.put(BASE_URL + supplier.id, supplier);
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteSupplier = async (id: number) => {
    try {
        await api.delete(BASE_URL + id);
        return true;
    } catch (error) {
        return false;
    }
};
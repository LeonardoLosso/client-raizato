import { Movement } from '@/core/types/products';
import api from '../interceptors/httpRequest';
import { decodeBase64 } from '@/core/utils/functions';

const BASE_URL = '/movimentacoes/';


export const listMovements = async (): Promise<Movement[]> => {
    try {

        const response =
            await api.get(BASE_URL);

        return response.data;
    } catch {
        return [];
    }
};

export const createMovement = async (movement: Movement) => {
    try {
        await api.post(BASE_URL, movement);
        return true;
    } catch (error) {
        return null;
    }
};

export const filterByProduct = async (id: string) => {
    try {
        const res = await api.get(`${BASE_URL}historico/${id}`);
        return res.data;
    } catch (error) {
        return null;
    }
};

export const getMovement = async (id: string | number = 0) => {
    try {
        if (!id) id = 0;
        if (typeof id === 'string') id = decodeBase64(id);

        const response = await api.get(BASE_URL + id);
        return response.data;
    } catch (error) {
        return false;

    }
};

export const updateMovement = async (movement: Movement) => {
    try {
        await api.put(BASE_URL + movement.id, movement);
        return true;
    } catch (error) {
        return false;
    }
};

export const deleteMovement = async (id: number) => {
    try {
        await api.delete(BASE_URL + id);
        return true;
    } catch (error) {
        return false;
    }
};
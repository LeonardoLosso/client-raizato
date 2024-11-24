import { decodeBase64 } from '@/core/utils/functions';
import axios from 'axios';
import { Router } from 'vue-router';
import api from '../interceptors/httpRequest';
import { Credentials, LoginData, User } from '@/core/types/auth';
import { removeAuthData, setAuthToken, setUserRole } from './tokenService';

const BASE_URL = '/auth/users/';

export const login = async (credentials: Credentials, router: Router, redirectTo: string) => {

    try {
        const response = (await api.post<LoginData>(`/auth/login`, credentials));
        if (!response || !response.data || !response.data.token) return;
        setAuthToken(response.data.token);
        setUserRole(response.data.role);
        router.push(redirectTo);
    } catch (erro) {
        return;
    }


};

export const logout = (router: Router) => {

    removeAuthData();

    router.push({ name: 'Login' });

}

export const getProfile = async (id: string | number = 0) => {
    try {
        if (!id) id = 0;
        if (typeof id === 'string') id = decodeBase64(id);

        const response = await api.get(BASE_URL + id);
        return response.data;
    } catch (error) {
        console.error('Error fetching profile:', error);
        return false;

    }
};

export const getUsers = async () => {
    try {
        const response = await api.get(BASE_URL);

        return response.data;
    } catch (error) {
        console.error('Error fetching profiles:', error);
        return false;
    }
};
export const createUser = async (user: User) => {
    try {
        await api.post(BASE_URL, user);
        return true;
    } catch (error) {
        console.error('Erro ao criar o usuário:', error);
        return false;
    }
};

export const updateUser = async (user: User) => {
    try {
        await api.put(BASE_URL + user.id, user);
        return true;
    } catch (error) {
        console.error('Erro ao atualizar o usuário:', error);
        return false;
    }
};

export const deleteUser = async (id: number) => {
    try {
        await api.delete(BASE_URL + id);
        return true;
    } catch (error) {
        console.error('Error deleting user:', error);
        return false;
    }
};



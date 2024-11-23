import { decodeBase64 } from '@/core/utils/functions';
import axios from 'axios';
import { Router } from 'vue-router';
import api from '../interceptors/httpRequest';
import { Credentials, LoginData } from '@/core/types/auth';
import { removeAuthData, setAuthToken, setUserRole } from './tokenService';

const apiUrl = process.env.VUE_APP_API_URL;


export const login = async (credentials: Credentials, router: Router, redirectTo: string) => {

    const response = (await axios.post<LoginData>(`${apiUrl}/auth/login`, credentials));

    if (!response || !response.data || !response.data.token) return;

    setAuthToken(response.data.token);
    setUserRole(response.data.role);
    router.push(redirectTo);
};

export const logout = (router: Router) => {
    
    removeAuthData();

    router.push({ name: 'Login' });

}

export const getProfile = async (router: Router, id: string | number = 0) => {

    if (typeof id === 'string')
        id = decodeBase64(id);

    const response =
        await api.get(`/auth/users/${id}`);
    return response.data.data;
}
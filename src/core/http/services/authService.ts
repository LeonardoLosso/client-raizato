import axios from 'axios';
import { Router } from 'vue-router';

const apiUrl = process.env.VUE_APP_API_URL;

export const login = async (credentials: Credentials, router: Router, redirectTo: string) => {

    const response = (await axios.post<LoginData>(`${apiUrl}/auth/login`, credentials));

    if (!response || !response.data || !response.data.token) return;

    localStorage.setItem('auth_token', response.data.token || '');

    router.push(redirectTo);
};

export const logout = (router: Router) => {
    localStorage.removeItem('auth_token');

    router.push({ name: 'Login' });

}
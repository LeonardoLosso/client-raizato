import axios from 'axios';
import { Router } from 'vue-router';

const apiUrl = process.env.VUE_APP_API_URL;

export const login = async (credentials: Credentials, router: Router) => {

    const response = (await axios.post<LoginData>(`${apiUrl}/auth/login`, credentials));
    
    if (!response) return;
    
    localStorage.setItem('auth_token', response.data.token || '');
    
    router.push({ name: 'Home' });
};
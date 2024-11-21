import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

export const login = async (credentials) => {
    try {
        const response = await axios.post(`${apiUrl}/auth/login`, credentials);
        localStorage.setItem('auth_token', response.token);
    } catch (error) {
        console.error("Erro ao realizar login:", error);
        throw error;
    }
};
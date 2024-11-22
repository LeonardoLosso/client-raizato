import axios from 'axios';

const apiUrl = process.env.VUE_APP_API_URL;

export const login = async (credentials: Credentials) => {
    const response = (await axios.post<LoginData>(`${apiUrl}/auth/login`, credentials));
    if (!response) return;

    localStorage.setItem('auth_token', response.data.token || '');
    console.log(response)
};
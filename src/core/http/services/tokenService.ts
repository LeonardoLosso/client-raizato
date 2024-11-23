const AUTH_TOKEN_KEY = 'auth_token';
const USER_ROLE_KEY = 'user_role';

export const getAuthToken = () => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
};

export const getUserRole = () => {
    return localStorage.getItem(USER_ROLE_KEY);
};

export const setAuthToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
};

export const setUserRole = (role: string) => {
    localStorage.setItem(USER_ROLE_KEY, role);
};

export const removeAuthData = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(USER_ROLE_KEY);
};
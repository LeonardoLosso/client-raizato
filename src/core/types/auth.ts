export interface LoginData {
    token: string;
    role: string;
}

export interface Credentials {
    email: string;
    password: string;
}

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    phone?: string;
    email: string;
    role: string;
    password?: string;
    passworConfirmation?: string;
}
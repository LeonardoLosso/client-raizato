import { getUserRole } from "../http/services/tokenService";

export function encodeBase64(id: string) {
    return btoa(id);
}

export function decodeBase64(encodedId: string) {
    return atob(encodedId);
}


export function isAdminOrManager() {
    const role = getUserRole();
    return role === 'admin' || role === 'manager';
}

export function isAdmin() {
    const role = getUserRole();
    return role === 'admin';
}
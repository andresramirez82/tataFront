import Axios from "@components/axios/Axios";
import { User } from './../models/user';
import { jwtDecode } from 'jwt-decode';
import { ApiResponseBase } from "../models/api";


export const createUser = (newUser: { name: string }): Promise<User> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<User>((resolve, reject) => {
        Axios.post(`/users`, newUser)
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const deleteUser = (idUser: number): Promise<User> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<User>((resolve, reject) => {
        Axios.delete(`/users/${idUser}`)
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

interface TokenContent {
    sub: string;
    exp: number;
    user: User;
}

export const tokenDecode = (): Promise<TokenContent> => {
    const token = sessionStorage.getItem('token') || '';
    return new Promise<TokenContent>((resolve) => {
        try {
            const decodedToken = jwtDecode<TokenContent>(token);
            resolve(decodedToken)
        } catch (error) {
            window.location.href = "/";
        }
    })
}

export const resetPass = (idUser: number, password: string): Promise<ApiResponseBase> => {
    return new Promise<ApiResponseBase>((resolve, reject) => {
        Axios.put(`/users/reset/${idUser}`, { password: password })
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    })
}

export const changeUser = (idUser: number, user: User): Promise<ApiResponseBase> => {
    return new Promise<ApiResponseBase>((resolve, reject) => {
        Axios.put(`/users/${idUser}`, user)
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    })
}

export const changeState = (idUser: number, active: boolean): Promise<ApiResponseBase> => {
    return new Promise<ApiResponseBase>((resolve, reject) => {
        Axios.put(`/users/active/${idUser}`, {
            active
        })
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    })
}

export const exist = (username: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
        Axios.get(`/users/exist/${username}`)
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    })
}

export const generarPassword = (longitud: number): string => {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+';
    let password = '';
    for (let i = 0; i < longitud; i++) {
        const caracterAleatorio = caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        password += caracterAleatorio;
    }
    return password;
}

export const getToken = (): string => {
    return sessionStorage.getItem('token') || '';
}

export const getTokenRefresh = (): string => {
    return sessionStorage.getItem('tokenRefresh') || '';
}
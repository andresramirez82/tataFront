import Axios from "components/axios/Axios";
import { User } from './../models/user';

export const createUser = (newUser: {name: string}): Promise<User> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<User>((resolve, reject) => {
        Axios.post(`/users`,newUser)
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
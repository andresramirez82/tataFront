import Axios from "components/axios/Axios";
import { pay } from 'models/Pay';


export const getPays = (): Promise<pay[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<pay[]>((resolve, reject) => {
        Axios.get(`pays`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const getPay = (id: number): Promise<pay> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<pay>((resolve, reject) => {
        Axios.get(`pays/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const createPay = (data: pay): Promise<pay> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<pay>((resolve, reject) => {
        Axios.post(`pays/`, {
            amount: data.amount,
            cartId: data.cart,
            paymentId: data.payment 
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};



import Axios from "components/axios/Axios";
import { Sale  } from "models/models";



export const createOrder = (items: Sale.sale[]): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        resolve(items)
        /*Axios.post(`/mercadopago`,items)
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });*/
    });

};
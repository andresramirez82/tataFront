import Axios from "components/axios/Axios";
import { Cart } from "models/models";

export const getCartToday = (): Promise<Cart.cart[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Cart.cart[]>((resolve, reject) => {
        Axios.get(`/carts/today`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};
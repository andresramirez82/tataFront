import Axios from "components/axios/Axios";
import { payments } from "models/cart";
import { Cart, Api, Sale } from "models/models";

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

export const AddCart = (newCart: Cart.cart): Promise<Api.CartApiResponseType> => {
    return new Promise<Api.CartApiResponseType>((resolve, reject) => {
        Axios.post(`/carts`, newCart).then(resp => {
            resolve(resp.data);
        })
            .catch(err => {
                console.error(err);
                reject(err);
            })
    })
}

export const getCart = (idCart: number): Promise<Cart.cart> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Cart.cart>((resolve, reject) => {
        Axios.get(`/carts/${idCart}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const addToCart = (Cart: Sale.saleCart): Promise<Api.CartApiResponseType | { message: string }> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Api.CartApiResponseType>((resolve, reject) => {
        Axios.post(`/sales/add-to-cart/`, Cart)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const getPayment = (): Promise<payments[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<payments[]>((resolve, reject) => {
        Axios.get(`/payments`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const updateCart = (idCart: number, idPayment: number): Promise<payments[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<payments[]>((resolve, reject) => {
        Axios.put(`/carts/confirm`, { idCart, idPayment })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};
import Axios from "components/axios/Axios";
import { carts, payments } from "models/cart";
import { Cart, Api, Sale, Discount } from "models/models";
import { withDiscount } from "models/models";



export const getCartToday = (): Promise<withDiscount[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<withDiscount[]>((resolve, reject) => {
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

export const getOpenCart = (): Promise<Cart.cart> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Cart.cart>((resolve, reject) => {
        Axios.get(`/carts/open`)
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

export const addPayment = (pay: payments): Promise<payments[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<payments[]>((resolve, reject) => {
        Axios.post(`/payments`, pay)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const deletePayment = (id: number): Promise<payments[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<payments[]>((resolve, reject) => {
        Axios.delete(`/payments/${id}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const updateCart = (idCart: number, idPayment: number, discount: Discount.dicountsResponse[] | undefined): Promise<payments[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<payments[]>((resolve, reject) => {
        Axios.put(`/carts/confirm`, { idCart, idPayment, discount })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const deleteCart = (idCart: number): Promise<carts[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<carts[]>((resolve, reject) => {
        Axios.delete(`/carts/${idCart}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const deleteSale = (idSale: number): Promise<Sale.sale[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Sale.sale[]>((resolve, reject) => {
        Axios.delete(`/sales/${idSale}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};



export const discountsForCart = (idCart: number): Promise<Discount.dicountsResponse[]> => {
    return new Promise<Discount.dicountsResponse[]>((resolve,reject) => {
        Axios.get(`/carts/${idCart}/discounts`).then( response => {
            resolve(response.data);
        })
        .catch((error) => {
            console.error(error);
            reject(error);
        });
    });
}
import Axios from "components/axios/Axios";
import { Product } from "models/models";
import { pagination } from './../models/api';
import { products,Tag } from "models/products";
import { discounts } from "models/discount";


export const searchProduct = (search: string): Promise<Product.product[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Product.product[]>((resolve, reject) => {
        Axios.get(`/products/search/${search}`)
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

export const createProduct = (newProd: Product.product): Promise<Product.product> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Product.product>((resolve, reject) => {
        Axios.post(`/products/`, newProd)
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

export const getProductByBarcode = (code: string): Promise<Product.product[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Product.product[]>((resolve, reject) => {
        Axios.get(`/products/search/${code}`)
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

export const getProductById = (id: number): Promise<Product.product> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Product.product>((resolve, reject) => {
        Axios.get(`/products/${id}`)
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

export const addStock = (productId: number, quantityToAdd: number): Promise<Product.product> => {
    return new Promise<Product.product>((resolve, reject) => {

        const quantity = { quantity: quantityToAdd };

        Axios.put(`/products/${productId}/updateQuantityAndDate`, quantity)
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
}

export const removeStock = (productId: number, quantityToAdd: number): Promise<Product.product> => {
    return new Promise<Product.product>((resolve, reject) => {

        const quantity = { quantity: quantityToAdd };

        Axios.put(`/products/${productId}/removeQuantityAndDate`, quantity)
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
}

export const updateProduct = (productId: number, productDetails: Product.product): Promise<Product.product> => {
    return new Promise<Product.product>((resolve, reject) => {
        Axios.put(`/products/${productId}`, productDetails)
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
}

export const deleteProduct = (productId: number): Promise<Product.product> => {
    return new Promise<Product.product>((resolve, reject) => {
        Axios.delete(`/products/${productId}`)
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
}



export const fetchProductsAPI = (currentPage: number, order: string): Promise<pagination<products>> => {
    return new Promise<pagination<products>>((resolve, reject) => {
        Axios.get(`/products?page=${currentPage}&sort=${order}`)
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
}


export const fetchDiscounts = (currentPage: number, order: string): Promise<pagination<discounts>> => {
    return new Promise<pagination<discounts>>((resolve, reject) => {
        Axios.get(`/discounts`)
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
}


export const CreateDiscounts = (newDisc: discounts): Promise<discounts> => {
    return new Promise<discounts>((resolve, reject) => {
        Axios.post(`/discounts`,newDisc)
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
}


export const getDiscount = (id: number): Promise<discounts> => {
    return new Promise<discounts>((resolve, reject) => {
        Axios.get(`/discounts/${id}`)
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
}


export const listTags = (): Promise<Tag[]> => {
    return new Promise<Tag[]>((resolve, reject) => {
        Axios.get(`/tags`)
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
}








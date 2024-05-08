import { User } from "./user";
import { carts } from "./cart";
import { products  } from "./products";



/**
 * Commun
 */
export interface ApiResponseBase {
    message: string;
}
export interface pagination<T> {
    dato: T[],
    nextPage: number,
    prevPage: number,
    totalPages: number
}



export interface UserApiResponse extends ApiResponseBase {
    user: User;
    token: string;
    message: string;
}

export interface CartApiResponse extends ApiResponseBase {
    cart: carts;
}

export interface ProdApiResponse extends ApiResponseBase {
    product: products;
    
}

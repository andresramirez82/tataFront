import { User } from "./user";
import { products } from "./products";
import { UserApiResponse, CartApiResponse, ProdApiResponse } from "./api";
import { carts } from "./cart";
import { Sale as Sales,SaleCart } from "./sales";

export declare namespace Auth {
    interface AuthUser extends User {
        // Puedes añadir propiedades específicas de autenticación aquí si es necesario
        isAuthenticated: boolean;
    }

}
export declare namespace Api {
    export type UserApiResponseType = UserApiResponse;
    export type CartApiResponseType = CartApiResponse;
    export type ProdApiResponseType = ProdApiResponse
}

export declare namespace Product {
    export type product = products;
}

export declare namespace Cart {
    export type cart = carts;
}

export declare namespace Sale {
    export type sale = Sales;
    export type saleCart = SaleCart;
}
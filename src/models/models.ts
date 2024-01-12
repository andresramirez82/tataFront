import { User } from "./user";
import { products } from "./products";
import { UserApiResponse, CartApiResponse } from "./api";
import { carts } from "./cart";
import { Sale as Sales } from "./sales";

export declare namespace Auth {
    interface AuthUser extends User {
        // Puedes añadir propiedades específicas de autenticación aquí si es necesario
        isAuthenticated: boolean;
    }

}
export declare namespace Api {
    export type UserApiResponseType = UserApiResponse;
    export type CartApiResponseType = CartApiResponse;
}

export declare namespace Product {
    export type product = products;
}

export declare namespace Cart {
    export type cart = carts;
}

export declare namespace Sale {
    export type sale = Sales;
}
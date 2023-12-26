import { User } from "./user";
import { products } from "./products";
import { UserApiResponse } from "./api";

export declare namespace Auth {
    interface AuthUser extends User {
        // Puedes añadir propiedades específicas de autenticación aquí si es necesario
        isAuthenticated: boolean;
    }

}
export declare namespace Api {
    export type UserApiResponseType = UserApiResponse;
}

export declare namespace Product {
    export type product = products;
}
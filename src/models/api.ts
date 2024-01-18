import { User } from "./user";
import { carts } from "./cart";
import { products  } from "./products";

interface ApiResponseBase {
    message: string;
}

export interface UserApiResponse extends ApiResponseBase {
    user: User;
}

export interface CartApiResponse extends ApiResponseBase {
    cart: carts;
}

export interface ProdApiResponse extends ApiResponseBase {
    product: products;
}
import { User } from "./user";
import { carts } from "./cart";

interface ApiResponseBase {
    message: string;
}

export interface UserApiResponse extends ApiResponseBase {
    user: User;
}

export interface CartApiResponse extends ApiResponseBase {
    cart: carts;
}
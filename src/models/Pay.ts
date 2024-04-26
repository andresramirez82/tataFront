import { payments, carts } from 'models/cart';

export interface pay {
    id: number;
    amount: number;
    cart: number;
    payment: number;
}
import { products } from "./products";

export interface Sale {
    id: number;
    product: products;
    quantity: number;
    saleDate: Date;
    totalPrice: number;
}

export interface SaleCart {
    productId: number,
    quantity: number,
    cartId: number
}
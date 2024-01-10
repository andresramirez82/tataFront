import {products  } from "./products";

export interface Sale {
    id:         number;
    product:    products;
    quantity:   number;
    saleDate:   Date;
    totalPrice: number;
   }
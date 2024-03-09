import { discounts } from "./discount";

export interface products {
    barcode: string;
    comment: string;
    cost: number;
    date?: Date;
    id?: number;
    name: string;
    price: number;
    quantity: number;
    threshold: number;
    kind: boolean;
    discounts?: discounts[]
}

export interface ProductApi {
    id: number;
    barcode: string;
    name: string;
    price: number;
    cost: number;
    threshold: number;
    quantity: number;
    date: Date;
    comment: string;
}

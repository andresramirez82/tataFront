import { products } from "./products";

export interface discounts {
    id: number,
    name: string,
    startDate: Date,
    endDate: Date,
    discountAmount: number,
    requiredQuantity: number,
    product: products
}

export interface dicountResponse {
    productName: string;
    discountName: string;
    discount: number;
  }
import { products } from "./products";

interface DiscountDays {
    [key: string]: boolean;
  }
export interface discounts {
    id?: number,
    name: string,
    startDate: Date,
    endDate: Date,
    discountAmount: number,
    requiredQuantity: number,
    product: products,
    discountDays: DiscountDays;
}

export interface dicountResponse {
    productName: string;
    discountName: string;
    discount: number;
  }
import { Sale } from "./sales";
import { User } from "./user";
import { dicountResponse } from "./discount";

interface DiscountApplied {
    discountName: string;
    discountAmount: number;
    productId: number; // O cualquier otro identificador único del producto
  }

export interface carts {
    id: number;
    cartDate: Date;
    sales: Sale[];
    user: User;
    discountsApplied: dicountResponse[];
}

export interface payments {
    id?: number;
    tipo: string;
}
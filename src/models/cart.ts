import { Sale } from "./sales";
import { User } from "./user";

export interface carts {
    id: number;
    cartDate: Date;
    sales: Sale[];
    user: User;
}
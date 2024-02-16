import { Sale } from "./sales";
import { User } from "./user";

export interface carts {
    id: number;
    cartDate: Date;
    sales: Sale[];
    user: User;
}

export interface payments {
    id?: number;
    tipo: string;
}
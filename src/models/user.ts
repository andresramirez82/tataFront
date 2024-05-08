
export enum UserRole {
  Admin = 'admin',
  Customer = 'customer',
  Seller = 'seller'
}
export interface User {
    id: number;
    name: string;
    lastlogin: Date | null;
    password: string;
    rol: UserRole;
    username: string;
    active?: boolean;
  }
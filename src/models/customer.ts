export interface Customer {
    id: number;
    name: string;
    dni?: number;
    street?: string;
    details?: string;
  }

  export interface CurrentAccount {
    id: number;
    balance: number;
    customer: Customer;
  }
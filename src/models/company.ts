export interface Company {
    id: number,
    name: string,
    cuil: string,
    phone: string,
    email: string,
    address: string,
    logo?: any; // Puede ser un Buffer o nulo si no hay logo
}
import { format } from 'date-fns';
import { Auth,  Sale, Discount} from "models/models";


/**
 * 
 * @param fechaOriginal 
 * @description Returns Date on Argetinian format
 * @returns 
 */
export const formatDate = (fechaOriginal: Date | null): string => {
    if (fechaOriginal !== null) {
        const fechaFormateada = format(new Date(fechaOriginal), 'dd/MM/yyyy HH:mm\'Hs.\'');
        return fechaFormateada;
    } else {
        return 'nunca entró';
    }
}

export const formatDateISO = (fechaOriginal: Date | null): string => {
    if (fechaOriginal !== null) {
        const fechaFormateada = format(new Date(fechaOriginal), 'yyyy-MM-dd\'T\'HH:mm:ss');

        return fechaFormateada;
    } else {
        return 'nunca entró';
    }
}

/**
 * @description Save the user´s info into sessionStorage
 * @param id 
 * @param name 
 */
export const SaveUser = (id: number, name: string, lastlogin: Date) => {
    const user: Auth.AuthUser = {
        id,
        name,
        isAuthenticated: true,
        lastlogin 
    }
    sessionStorage.setItem('user',JSON.stringify(user));
}

export const getUser = () : Auth.AuthUser  =>  {
    return JSON.parse( sessionStorage.getItem('user') || '')
}

export const acumular = (sales: Sale.sale[], discount: Discount.dicountsResponse[] | undefined) => {
    
    let Cantidad: number = 0;
    sales.forEach(sale => {
        
       // const cantidad = sale.quantity * sale.product.price; This way the price of the product was not stored if it was changed.
        const cantidad = sale.totalPrice;
        // console.log(cantidad, sale.quantity, ' * ', sale.product.price);
        Cantidad += (cantidad)
    })
    discount?.forEach( dis => {
        const cantidad = dis.discount
        // console.log(cantidad, sale.quantity, ' * ', sale.product.price);
        Cantidad += (cantidad);
    })
    return Cantidad;
}
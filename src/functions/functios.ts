import { format } from 'date-fns';
import { Auth } from "models/models";


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

export const getUser = ()  =>  {
    return JSON.parse( sessionStorage.getItem('user') || '')
}
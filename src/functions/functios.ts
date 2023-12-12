import { format } from 'date-fns';

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
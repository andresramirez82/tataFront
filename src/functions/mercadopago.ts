import Axios from "components/axios/Axios";
import { Cart } from "models/models";
import { formatDate } from "functions/functios";

interface ItemMp {
    id: number;
    title: string;
    currency_id: "AR",
    unit_price: number;
    quantity: number;
    description: string;
    picture_url: string;
}
interface OrderMP {
    external_reference: string;
    items: ItemMp[]
    notification_url: string;
}


export const createOrder = async (cart: Cart.cart, total: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        const itemsMP: ItemMp[] = [
            {
                currency_id: 'AR',
                description: `Venta ${formatDate(cart.cartDate)}`,
                id: cart.id,
                picture_url: '',
                quantity: 1,
                title: 'Pixel Forge',
                unit_price: total
            }
        ];

        const DatosEnviar = {
            items: itemsMP,
            cartId: cart.id
        }


        Axios.post(`/mercadopago`, DatosEnviar)
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                // const usersData: Auth.AuthUser[] = response.data;
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });

};

export const getOrder = async (idPreferencia: number): Promise<any> => {
    return new Promise<any>((resolve, reject) => {
        Axios.get(`/mercadopago/consultar-orden/${idPreferencia}`).then(resp => {
            resolve(resp.data);
        }).catch(err => {
            reject(err)
        })
    });
}
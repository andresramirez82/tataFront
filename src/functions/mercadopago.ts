import Axios from "components/axios/Axios";


const userid = 7022064;
const caja = 'CAJA01TATA';

Axios.defaults.headers.common = {
    'Authorization': `Bearer APP_USR-5601944275509139-031509-73aaaa769a453e20826d6b2a44532be7-7022064`,
    'Access-Control-Allow-Origin': '*', // O la URL específica desde la que se hace la solicitud
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Métodos permitidos
    'Access-Control-Allow-Headers': 'Origin, Content-Type, Accept' // Cabeceras permitidas
};

export const createOrder = (venta: any): any => {

    const msg = {
        "external_reference": "Factura-0002",
        "items": [
            {
                "id": 78123172,
                "title": "Shampoo",
                "currency_id": "AR",
                "unit_price": 120,
                "quantity": 1,
                "description": "Almendras",
                "picture_url": "https://bit.ly/2nxdWHa"
            },
            {
                "id": 78123173,
                "title": "Shampoo 2",
                "currency_id": "AR",
                "unit_price": 240,
                "quantity": 1,
                "description": "Almendras sd",
                "picture_url": "https://bit.ly/2nxdWHa"
            }
        ],
        "notification_url": "http://www.yourserver.com"
    };
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<any>((resolve, reject) => {
        Axios.post(`https://api.mercadopago.com/mpmobile/instore/qr/${userid}/${caja}`, msg)
            .then((response) => {
                // Aquí asumo que los datos devueltos por la API tienen la forma correcta
                console.log(response)
                resolve(response);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};
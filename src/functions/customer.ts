import Axios from "../components/axios/Axios";
import { Customer, CurrentAccount } from '../models/customer';


/**
 * Customer
 */

export const getCustomers = (): Promise<Customer[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Customer[]>((resolve, reject) => {
        Axios.get(`customers`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                // console.error(error);
                reject(error);
            });
    });
};

export const createCustomer = (newCustomer: Customer): Promise<Customer> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Customer>((resolve, reject) => {
        Axios.post(`customers`, newCustomer)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const deleteCustomer = (idCustomer: number): Promise<Customer> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Customer>((resolve, reject) => {
        Axios.delete(`customers/${idCustomer}`,)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

/**
 * CurrentAccount
 */

export const getCurrentAccount = (): Promise<CurrentAccount[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<CurrentAccount[]>((resolve, reject) => {
        Axios.get(`current-accounts`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const createCurrentAccount = (newCA: CurrentAccount): Promise<CurrentAccount> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<CurrentAccount>((resolve, reject) => {
        Axios.post(`current-accounts`, newCA)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const deleteCurrentAccount = (idCA: number): Promise<CurrentAccount> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<CurrentAccount>((resolve, reject) => {
        Axios.delete(`current-accounts/${idCA}`,)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const sendMail = (mail: string, text: string, subject: string): Promise<any> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<any>((resolve, reject) => {
        Axios.post(`customers/mail`, { mail, text, subject })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const sendMailPdf = (formData: FormData): Promise<any> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<any>((resolve, reject) => {
        Axios.post(`customers/mailpdf`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const getMails = (): Promise<{ id: number, mail: string }[]> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<{ id: number, mail: string }[]>((resolve, reject) => {
        Axios.get(`customers/mails`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};
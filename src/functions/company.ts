import Axios from "components/axios/Axios";
import { Company } from "models/company";


export const getCompanies = (): Promise<Company> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Company>((resolve, reject) => {
        Axios.get(`companies`)
            .then((response) => {
                resolve(response.data[0]);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const getCompany = (idCompany: number): Promise<Company> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Company>((resolve, reject) => {
        Axios.get(`companies/${idCompany}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const createCompany = (company: Company): Promise<Company> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Company>((resolve, reject) => {
        Axios.post(`companies`, company)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};

export const updateCompany = (company: Company): Promise<Company> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Company>((resolve, reject) => {
        Axios.put(`companies/${company.id}`, company)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};


export const deleteCompany = (idCompany: number): Promise<Company> => {
    // Utiliza async/await para trabajar de forma más cómoda con Promesas
    return new Promise<Company>((resolve, reject) => {
        Axios.delete(`companies/${idCompany}`)
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                console.error(error);
                reject(error);
            });
    });
};
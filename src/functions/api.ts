import Axios from "components/axios/Axios";
import { Auth, Api, Product } from "models/models";


export const getUsers = (): Promise<Auth.AuthUser[]> => {
  // Utiliza async/await para trabajar de forma más cómoda con Promesas
  return new Promise<Auth.AuthUser[]>((resolve, reject) => {
    Axios.get('/users')
      .then((response) => {
        // Aquí asumo que los datos devueltos por la API tienen la forma correcta
        const usersData: Auth.AuthUser[] = response.data;
        resolve(usersData);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};

export const login = (id: number): Promise<Api.UserApiResponseType> => {
  // Utiliza async/await para trabajar de forma más cómoda con Promesas
  return new Promise<Api.UserApiResponseType>((resolve, reject) => {
    const param = {
      id
    }
    Axios.post(`/login/`, param)
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

export const searchProduct = (search: string): Promise<Product.product[]> => {
  // Utiliza async/await para trabajar de forma más cómoda con Promesas
  return new Promise<Product.product[]>((resolve, reject) => {
    Axios.get(`/products/search/${search}`)
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


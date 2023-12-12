import Axios from "components/axios/axios";
import { Auth } from "models/models";


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
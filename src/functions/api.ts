import Axios from "components/axios/Axios";
import { Auth, Api } from "models/models";
import {
  searchProduct,
  createProduct,
  getProductByBarcode,
  getProductById,
  addStock,
  removeStock,
  updateProduct,
  deleteProduct,
  CreateDiscounts,
  getDiscount,
  UpdateDiscounts,
  deleteDiscount

} from "./product";
import { getCartToday, AddCart, getCart, addToCart, getPayment, updateCart, deleteCart, deleteSale, discountsForCart, getOpenCart } from "./cart";
import { getTags } from "./tag";
import { createUser, deleteUser } from "./User";


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

export const getUser = (id: number): Promise<Auth.AuthUser> => {
  // Utiliza async/await para trabajar de forma más cómoda con Promesas
  return new Promise<Auth.AuthUser>((resolve, reject) => {
    Axios.get(`/users/${id}`)
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


export const ProductClass = {
  searchProduct,
  createProduct,
  getProductByBarcode,
  getProductById,
  addStock,
  removeStock,
  updateProduct,
  deleteProduct
}

export const DiscountClass = {
  CreateDiscounts,
  getDiscount,
  UpdateDiscounts,
  deleteDiscount
}

export const CartClass = {
  getCartToday,
  AddCart,
  getCart,
  addToCart,
  getPayment,
  updateCart,
  deleteCart,
  deleteSale,
  discountsForCart,
  getOpenCart
}

export const UserClass = {
  createUser, deleteUser
}

export const TagClass = {
  getTags
}
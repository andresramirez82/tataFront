import { rejects } from "assert";
import Axios from "components/axios/Axios";
import { Auth, Api, Product } from "models/models";
import { products } from "models/products";


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


const searchProduct = (search: string): Promise<Product.product[]> => {
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

const createProduct = (newProd: Product.product): Promise<Product.product> => {
  // Utiliza async/await para trabajar de forma más cómoda con Promesas
  return new Promise<Product.product>((resolve, reject) => {
    Axios.post(`/products/`, newProd)
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

const getProductByBarcode = (code: string): Promise<Product.product[]> => {
  // Utiliza async/await para trabajar de forma más cómoda con Promesas
  return new Promise<Product.product[]>((resolve, reject) => {
    Axios.get(`/products/search/${code}`)
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

const getProductById = (id: number): Promise<Product.product> => {
  // Utiliza async/await para trabajar de forma más cómoda con Promesas
  return new Promise<Product.product>((resolve, reject) => {
    Axios.get(`/products/${id}`)
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

const addStock = (productId: number, quantityToAdd: number): Promise<Product.product> => {
  return new Promise<Product.product>((resolve, reject) => {

    const quantity = { quantity : quantityToAdd };

    Axios.put(`/products/${productId}/updateQuantityAndDate`,quantity)
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
}

const removeStock = (productId: number, quantityToAdd: number): Promise<Product.product> => {
  return new Promise<Product.product>((resolve, reject) => {

    const quantity = { quantity : quantityToAdd };

    Axios.put(`/products/${productId}/removeQuantityAndDate`,quantity)
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
}

const updateProduct = (productId: number, productDetails: Product.product): Promise<Product.product> => {
  return new Promise<Product.product>((resolve, reject) => {
    Axios.put(`/products/${productId}`,productDetails)
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
}



export const ProductClass = {
  searchProduct,
  createProduct,
  getProductByBarcode,
  getProductById,
  addStock,
  removeStock,
  updateProduct
}


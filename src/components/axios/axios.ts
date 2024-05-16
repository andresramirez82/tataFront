import axios, { AxiosInstance, AxiosError } from 'axios';
import { config } from "../../config/config";
import { getToken } from "../../functions/User";

const api: AxiosInstance = axios.create({
  baseURL: config.urlAPI,
});

// Define el tipo de retorno para el interceptor de solicitud
api.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // const originalRequest = error.config;
    // console.log(originalRequest)

    // Si el estado de error es 403 y no hay un intento de solicitud original (_retry),
    // significa que el token ha expirado y necesitamos redirigir a la página raíz
    
    if (error.request.status === 403 || error.request.status === 401) {
      sessionStorage.clear();
     
      // Redirige a la página raíz
      
      window.location.href = "/";
      console.clear();
      
      // Lanza un error para detener la ejecución del código subsiguiente
      throw new Error("token");
    }

    // Si hay un error diferente, simplemente rechaza la promesa con el error
    return Promise.reject(error);
  }
);

export default api;
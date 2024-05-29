import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { config } from "../../config/config";
import { getToken, getTokenRefresh} from "../../functions/User";
import { SaveUser } from "functions/functios"; // Asegúrate de que la ruta a SaveUser sea correcta



const api: AxiosInstance = axios.create({
  baseURL: config.urlAPI,
});

// Extiende el tipo InternalAxiosRequestConfig para incluir la propiedad _retry
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

// Define el interceptor de solicitud
api.interceptors.request.use(
  async (config: CustomAxiosRequestConfig) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Define el interceptor de respuesta
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as CustomAxiosRequestConfig;
    
    if (originalRequest) {
      // Si el estado de error es 401 y no hay un intento de solicitud original (_retry),
      // significa que el token ha expirado y necesitamos intentar obtener uno nuevo
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshToken = await getTokenRefresh(); // Asegúrate de usar await para obtener el refresh token
        try {
          axios.post(`${config.urlAPI}login/auth/token`, {
            refresh_token: refreshToken
        })
        .then(response => {
           if (response.status === 201 || response.status === 200) {
            const newToken = response.data.token;
            // console.log(response.data)
            SaveUser(newToken, refreshToken);
            // Actualiza los encabezados para la solicitud original y las futuras solicitudes
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + newToken;
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
            // Reintenta la solicitud original
            return axios(originalRequest);
          } else {
            window.location.href = "/";
            sessionStorage.clear();
          }
        })
        .catch(error => {
            // Maneja el error aquí
            window.location.href = "/";
            sessionStorage.clear();
        });

          
        
        } catch (refreshError) {
          //window.location.href = "/";
          return Promise.reject(refreshError);
        }
      }
    }

    // Si el error es 403 o 401 (y no es un problema de token expirado)
    if (error.request.status  === 402) {
      //sessionStorage.clear();
      // Redirige a la página raíz
            
      window.location.href = "/";
      //console.clear();
      //throw new Error("token");
    }

    // Si hay un error diferente, simplemente rechaza la promesa con el error
    return Promise.reject(error);
  }
);

export default api;
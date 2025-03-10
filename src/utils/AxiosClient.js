import axios from "axios";
import { toast } from "react-toastify";

const axiosClient = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token a las solicitudes
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejar errores globalmente
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      toast.error(`Error ${error.response.status}: ${error.response.data.message || "Ocurrió un error"}`);
    } else if (error.request) {
      toast.error("No se pudo conectar al servidor. Verifica tu conexión.");
    } else {
      toast.error("Error desconocido. Inténtalo nuevamente.");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;

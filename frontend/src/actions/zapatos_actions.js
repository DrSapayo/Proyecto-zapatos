import axios from "axios";

const API_URL = 'http://localhost:8000'

export const agregarProducto = async (producto) => {
    try {
        const response = await axios.post(`${API_URL}/api/Inventario`);
        return response.data;
    } catch(error){
        console.error("Error al intentar recuperar el inventario");
        throw error;
    }
};

export const recuperarInventario = async() => {
    try {
        const response = await axios.get(`${API_URL}/api/Inventario`);
        return response.data;
    } catch (error) {
        console.error("Error al intentar mostrar el inventario");
        throw error;
    }
};

export const agregarVenta = async (Venta) =>{
    try{
        const response = await axios.post(`${API_URL}/api/SistemaVentas`);
        return response.data;
    } catch(error) {
        console.error("No se pudo registrar la venta con exito");
        throw error;
    }
}
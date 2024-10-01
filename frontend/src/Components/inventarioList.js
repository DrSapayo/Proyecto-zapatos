import React, { useEffect, useState } from 'react';
import axios from 'axios';

const InventarioList = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/Inventario/');
            setProductos(response.data);
        } catch (error) {
            console.error('Error al obtener los productos', error);
        }
    };

    return (
        <div>
            <h3>Lista de productos</h3>
            <ul>
                {productos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre_producto} - {producto.stock} unidades - ${producto.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default InventarioList;

import React, { useState } from 'react';
import axios from 'axios';

const InventarioForm = ({ actualizarProductos }) => {
    const [nuevoProducto, setNuevoProducto] = useState({
        nombre_producto: '',
        stock: '',
        categoria: '',
        precio: '',
    });

    const handleChange = (e) => {
        setNuevoProducto({
            ...nuevoProducto,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/Inventario/', nuevoProducto);
            setNuevoProducto({
                nombre_producto: '',
                stock: '',
                categoria: '',
                precio: '',
            });
            actualizarProductos(); // Llama a la función pasada desde el padre para actualizar la lista
        } catch (error) {
            console.error('Error al agregar el producto', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="nombre_producto"
                placeholder="Nombre del producto"
                value={nuevoProducto.nombre_producto}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                name="stock"
                placeholder="Stock"
                value={nuevoProducto.stock}
                onChange={handleChange}
                required
            />
            <input
                type="text"
                name="categoria"
                placeholder="Categoría"
                value={nuevoProducto.categoria}
                onChange={handleChange}
                required
            />
            <input
                type="number"
                step="0.01"
                name="precio"
                placeholder="Precio"
                value={nuevoProducto.precio}
                onChange={handleChange}
                required
            />
            <button type="submit">Agregar Producto</button>
        </form>
    );
};

export default InventarioForm;

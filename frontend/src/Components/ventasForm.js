import React, { useState, useEffect } from 'react';
import { recuperarInventario, agregarVenta } from '../actions/zapatos_actions';

function VentasForm() {
  const [inventario, setInventario] = useState([]);
  const [fechaVenta, setFechaVenta] = useState('');
  const [productoId, setProductoId] = useState('');
  const [stockEgreso, setStockEgreso] = useState('');



  useEffect(() => {
    const cargarInventario = async () => {
      try {
        const data = await recuperarInventario();
        setInventario(data);
      } catch (error) {
        console.error("Error al cargar el inventario:", error);
      }
    };
    cargarInventario();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nuevaVenta = {
      inventario: productoId,
      stock_egreso: parseInt(stockEgreso),
      fecha_venta: fechaVenta,
    };
    try{
      const ventaRegistrada = await agregarVenta(nuevaVenta);
      console.log("Venta registrada con exito", ventaRegistrada)
    }catch(error){
      if(error.response && error.response.status === 500){
        alert("No hay stock disponible")
      }
      console.error("Error al registrar la venta: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} id='formul'>
      <div>
        <label>Producto:</label>
        <select value={productoId} onChange={(e) => setProductoId(e.target.value)} required>
          <option value="">Selecciona un producto</option>
          {inventario.map((item) => (
            <option key={item.id} value={item.id}>{item.nombre_producto}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Fecha de venta:</label>
        <input
          type="date"
          value={fechaVenta}
          onChange={(e) => setFechaVenta(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Cantidad a vender:</label>
        <input
          type="number"
          value={stockEgreso}
          onChange={(e) => setStockEgreso(e.target.value)}
          required
          id='stock'
        />
      </div>
      <button type="submit">Registrar venta</button>
    </form>
  );
}

export default VentasForm;

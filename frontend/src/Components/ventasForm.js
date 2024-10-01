import React, { useState, useEffect } from 'react';
import axios from 'axios';

function VentasForm() {
  const [inventario, setInventario] = useState([]);
  const [fechaVenta, setFechaVenta] = useState('');
  const [productoId, setProductoId] = useState('');
  const [stockEgreso, setStockEgreso] = useState('');



  useEffect(() => {
    axios.get('http://localhost:8000/api/Inventario/')
      .then((response) => {
        setInventario(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar el inventario:", error);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const nuevaVenta = {
      inventario: productoId,
      stock_egreso: parseInt(stockEgreso),
      fecha_venta: fechaVenta,
    };
    axios.post('http://localhost:8000/api/SistemaVentas/', nuevaVenta)
      .then((response) => {
        console.log("Venta registrada:", response.data);
      })
      .catch((error) => {
        if(error.response && error.response.status === 500){
          alert("No hay stock suficiente");
        }
        console.error("Error al registrar la venta:", error);
      });
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

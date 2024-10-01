import './App.css';
import React, { useState } from 'react';
import InventarioForm from './Components/inventarioForm';
import InventarioList from './Components/inventarioList';
import VentasForm from './Components/ventasForm';

function App() {
  const [productos, setProductos] = useState([]);

  const actualizarProductos = () => {
    setProductos((prev) => [...prev]);
  };

  return (
    <div className='container'>
      <h1>Bienvenido al sistema de inventario de Pasos Elegantes</h1>
      <InventarioForm actualizarProductos={actualizarProductos} />
      <VentasForm />
      <InventarioList productos={productos} />      
    </div>
  );
}

export default App;

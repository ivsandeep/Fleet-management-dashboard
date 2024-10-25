import React, { useState, useEffect } from 'react';
import VehicleList from './components/VehicleList';
import Dashboard from './components/Dashboard';
import ChargingSchedule from './components/ChargingSchedule';
import './App.css'; // TailwindCSS import

const App = () => {
  const [vehicles, setVehicles] = useState([]);

  useEffect(() => {
    const storedVehicles = JSON.parse(localStorage.getItem('vehicles')) || [];
    setVehicles(storedVehicles);
  }, []);

  const updateLocalStorage = (updatedVehicles) => {
    setVehicles(updatedVehicles);
    localStorage.setItem('vehicles', JSON.stringify(updatedVehicles));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-3xl font-bold text-center mb-6">Fleet Management Dashboard</h1>
        <Dashboard vehicles={vehicles} />
        <ChargingSchedule vehicles={vehicles} updateLocalStorage={updateLocalStorage} />
        <VehicleList vehicles={vehicles} updateLocalStorage={updateLocalStorage} />
      </div>
    </div>
  );
};

export default App;

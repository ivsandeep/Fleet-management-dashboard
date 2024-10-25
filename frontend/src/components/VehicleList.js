import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCard';

const VehicleList = ({ vehicles, updateLocalStorage }) => {
  const [newVehicle, setNewVehicle] = useState({ battery: 100, distance: 0, lastCharge: new Date().toLocaleString(), status: 'Idle' });
  const [editingVehicle, setEditingVehicle] = useState(null); // For editing a vehicle

  const handleAddVehicle = () => {
    const updatedVehicles = [...vehicles, { ...newVehicle, id: Date.now() }];
    updateLocalStorage(updatedVehicles);
    setNewVehicle({ battery: 100, distance: 0, lastCharge: new Date().toLocaleString(), status: 'Idle' }); // Reset form
  };

  const handleEditVehicle = (vehicle) => {
    setEditingVehicle(vehicle);
    setNewVehicle(vehicle); // Populate form with the vehicle's data
  };

  const handleUpdateVehicle = () => {
    const updatedVehicles = vehicles.map(v => (v.id === editingVehicle.id ? { ...newVehicle } : v));
    updateLocalStorage(updatedVehicles);
    setEditingVehicle(null);
    setNewVehicle({ battery: 100, distance: 0, lastCharge: new Date().toLocaleString(), status: 'Idle' }); // Reset form
  };

  const handleDeleteVehicle = (id) => {
    const updatedVehicles = vehicles.filter(vehicle => vehicle.id !== id);
    updateLocalStorage(updatedVehicles);
  };

  // Real-time status updates
  useEffect(() => {
    const intervalId = setInterval(() => {
      const updatedVehicles = vehicles.map(vehicle => {
        let updatedVehicle = { ...vehicle };
        
        // Handle In Transit
        if (vehicle.status === 'In Transit') {
          // Only consume battery if it is above 0
          if (vehicle.battery > 0) {
            const batteryConsumption = Math.floor(vehicle.distance / 3); // 1% battery loss for every 3 km
            updatedVehicle.battery = Math.max(0, vehicle.battery - batteryConsumption);
            updatedVehicle.distance += 1; // Simulate distance traveled
          } else {
            // When battery is 0, update status and set a warning message
            updatedVehicle.status = 'Idle'; // Change status to Idle
            updatedVehicle.lastCharge = "Charge the battery"; // Update last charge message
          }
        }

        // Handle Charging
        if (vehicle.status === 'Charging') {
          updatedVehicle.battery = Math.min(100, vehicle.battery + 10); // Increase battery by 10% every 10 minutes
        }

        return updatedVehicle;
      });

      updateLocalStorage(updatedVehicles);
    }, 60000); // Update every minute

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [vehicles, updateLocalStorage]);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Vehicle Management</h2>
      
      <div className="mb-4 p-4 bg-gray-100 rounded-lg shadow-md">
        <label className="block mb-1">Battery %:</label>
        <input
          type="number"
          placeholder="Enter battery percentage"
          value={newVehicle.battery}
          onChange={(e) => setNewVehicle({ ...newVehicle, battery: Number(e.target.value) })}
          className="border p-2 mr-2 w-full md:w-1/4"
        />
        
        <label className="block mb-1">Distance Traveled (km):</label>
        <input
          type="number"
          placeholder="Enter distance in kilometers"
          value={newVehicle.distance}
          onChange={(e) => setNewVehicle({ ...newVehicle, distance: Number(e.target.value) })}
          className="border p-2 mr-2 w-full md:w-1/4"
        />
        
        <label className="block mb-1">Last Charge Time:</label>
        <input
          type="text"
          placeholder="Enter last charge time"
          value={newVehicle.lastCharge}
          onChange={(e) => setNewVehicle({ ...newVehicle, lastCharge: e.target.value })}
          className="border p-2 mr-2 w-full md:w-1/4"
        />
        
        <label className="block mb-1">Status:</label>
        <select
          value={newVehicle.status}
          onChange={(e) => setNewVehicle({ ...newVehicle, status: e.target.value })}
          className="border p-2 mr-2 w-full md:w-1/4"
        >
          <option value="Idle">Idle</option>
          <option value="Charging">Charging</option>
          <option value="In Transit">In Transit</option>
        </select>
        
        <button onClick={editingVehicle ? handleUpdateVehicle : handleAddVehicle} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          {editingVehicle ? 'Update Vehicle' : 'Add Vehicle'}
        </button>
      </div>

      {vehicles.map(vehicle => (
        <div key={vehicle.id} className="mb-2">
          <VehicleCard vehicle={vehicle} onEdit={() => handleEditVehicle(vehicle)} onDelete={handleDeleteVehicle} />
        </div>
      ))}
    </div>
  );
};

export default VehicleList;

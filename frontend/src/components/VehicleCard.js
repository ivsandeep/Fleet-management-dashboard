// VehicleCard.js
import React from 'react';

const VehicleCard = ({ vehicle, onEdit, onDelete }) => {
  return (
    <div className={`border p-4 mb-4 rounded-lg shadow ${vehicle.status === 'Charging' ? 'bg-green-100' : vehicle.status === 'In Transit' ? 'bg-yellow-100' : 'bg-white'}`}>
      <h3 className="font-bold text-xl">{vehicle.id}</h3>
      <p>Battery: {vehicle.battery}%</p>
      <p>Distance: {vehicle.distance} km</p>
      <p>Last Charge: {vehicle.lastCharge}</p>
      <p>Status: <span className={`${vehicle.status === 'Charging' ? 'text-green-600' : vehicle.status === 'In Transit' ? 'text-yellow-600' : 'text-gray-600'}`}>{vehicle.status}</span></p>
      <div className="flex justify-between mt-2">
        <button onClick={onEdit} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 transition">
          Edit
        </button>
        <button onClick={() => onDelete(vehicle.id)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition">
          Delete
        </button>
      </div>
    </div>
  );
};

export default VehicleCard;

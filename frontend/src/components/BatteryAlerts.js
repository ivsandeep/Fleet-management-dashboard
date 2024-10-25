import React from 'react';

const BatteryAlerts = ({ vehicles }) => {
  const lowBatteryVehicles = vehicles.filter(vehicle => vehicle.battery < 15);

  return (
    <div className="max-w-md mx-auto p-6 bg-yellow-300 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Battery Alerts</h2>
      {lowBatteryVehicles.length > 0 ? (
        <ul className="list-disc list-inside">
          {lowBatteryVehicles.map(vehicle => (
            <li key={vehicle.id} className="text-red-600 mb-2">
              <span className="font-semibold">Vehicle ID:</span> {vehicle.id} has low battery ({vehicle.battery}%)
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No vehicles with low battery.</p>
      )}
    </div>
  );
};

export default BatteryAlerts;

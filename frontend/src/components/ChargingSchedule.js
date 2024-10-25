import React, { useState } from 'react';

const ChargingSchedule = ({ vehicles, updateLocalStorage }) => {
  const [schedule, setSchedule] = useState({ vehicleId: '', time: '' });
  const [chargingTimers, setChargingTimers] = useState({});

  // Log the vehicles to debug
  console.log("Available vehicles:", vehicles); // Log the available vehicles

  const handleScheduleCharging = () => {
    const scheduledTime = new Date(schedule.time).getTime();
    const currentTime = new Date().getTime();

    if (scheduledTime > currentTime) {
      const vehicleIndex = vehicles.findIndex(v => v.id.toString() === schedule.vehicleId.toString());

      console.log("Vehicle Index:", vehicleIndex); // Log vehicle index for debugging
      if (vehicleIndex > -1) {
        const updatedVehicles = [...vehicles];
        const timerId = setTimeout(() => {
          updatedVehicles[vehicleIndex].status = 'Charging';
          updatedVehicles[vehicleIndex].lastCharge = new Date().toLocaleString();
          updatedVehicles[vehicleIndex].battery = Math.min(100, updatedVehicles[vehicleIndex].battery + 10);
          updateLocalStorage(updatedVehicles);
          console.log(`Vehicle ID: ${updatedVehicles[vehicleIndex].id} is now charging.`);
        }, scheduledTime - currentTime);

        setChargingTimers(prev => ({
          ...prev,
          [schedule.vehicleId]: { timerId, time: new Date(schedule.time).toLocaleString() }
        }));
        setSchedule({ vehicleId: '', time: '' });
      } else {
        alert("Vehicle not found.");
      }
    } else {
      alert("Scheduled time must be in the future.");
    }
  };

  const handleClearSchedule = (vehicleId) => {
    clearTimeout(chargingTimers[vehicleId].timerId);
    const updatedTimers = { ...chargingTimers };
    delete updatedTimers[vehicleId];
    setChargingTimers(updatedTimers);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Charging Schedule Management</h2>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
        <select 
          value={schedule.vehicleId} 
          onChange={(e) => setSchedule({ ...schedule, vehicleId: e.target.value })} 
          className="border p-2 rounded-md mr-2 mb-2 md:mb-0">
          <option value="">Select Vehicle</option>
          {vehicles.map(vehicle => (
            <option key={vehicle.id} value={vehicle.id}>{vehicle.id}</option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={schedule.time}
          onChange={(e) => setSchedule({ ...schedule, time: e.target.value })}
          className="border p-2 rounded-md mb-2 md:mb-0"
        />
        <button 
          onClick={handleScheduleCharging} 
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-200">
          Schedule Charging
        </button>
      </div>

      <div>
  <h3 className="text-xl font-bold mb-4">Current Schedules</h3>
  {Object.keys(chargingTimers).length === 0 ? (
    <p className="text-gray-600 italic">No scheduled charging.</p>
  ) : (
    <ul className="list-disc list-inside">
      {Object.keys(chargingTimers).map(vehicleId => (
        <li key={vehicleId} className="flex justify-between items-center bg-white shadow-md p-3 rounded-md mb-3 hover:shadow-lg transition-shadow duration-300">
          <span className="text-gray-800">
            Vehicle ID: <span className="font-semibold">{vehicleId}</span> - Scheduled at <span className="font-semibold">{chargingTimers[vehicleId].time}</span>
          </span>
          <button 
            onClick={() => handleClearSchedule(vehicleId)} 
            className="text-red-600 hover:text-red-800 transition duration-200">
            Cancel
          </button>
        </li>
      ))}
    </ul>
  )}
</div>

    </div>
  );
};

export default ChargingSchedule;

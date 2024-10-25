import React from 'react';
import BatteryAlerts from './BatteryAlerts';

const Dashboard = ({ vehicles }) => {
  const totalVehicles = vehicles.length;
  const averageBattery = totalVehicles > 0 ? (vehicles.reduce((acc, v) => acc + v.battery, 0) / totalVehicles).toFixed(2) : 0;
  const lowBatteryCount = vehicles.filter(v => v.battery < 20).length;

  return (
    <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md my-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Fleet Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        <div className="bg-blue-100 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Total Vehicles:</p>
          <p className="text-2xl font-bold">{totalVehicles}</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Average Battery:</p>
          <p className="text-2xl font-bold">{averageBattery}%</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg shadow">
          <p className="text-lg font-semibold">Vehicles with Battery Below 20%:</p>
          <p className="text-2xl font-bold">{lowBatteryCount}</p>
        </div>
      </div>
      <BatteryAlerts vehicles={vehicles} />
    </div>
  );
};

export default Dashboard;

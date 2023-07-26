import React, { useState, useEffect } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Dashboard from './Dashboard';
import '../style/Chart.css';


const Chart = () => {
  const [data, setData] = useState([]);
  const [selectedOption, setSelectedOption] = useState({ value: 'Drift Velocity', label: 'Drift Velocity' });
  const [selectedOption2, setSelectedOption2] = useState({ value: 'Electric Field', label: 'Electric Field' });
  const [Yname, setYname] = useState({ value: '', label: '' });
  const [Xname, setXname] = useState({ value: '', label: '' });
  const [dashboards, setDashboards] = useState([
    {
      id: 1,
      firstGas: 'Ar',
      secondGas: 'CH4',
      valueFirstGas: '80.0',
      valueSecondGas: '20.0',
    },
  ]);

  useEffect(() => {
    setData([]);
  }, [dashboards]);

  const handleYnameChange = (value) => {
    setYname(value);
  };

  const handleXnameChange = (value) => {
    setXname(value);
  };
  return (
    <div>
      <Dashboard
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        selectedOption2={selectedOption2}
        setSelectedOption2={setSelectedOption2}
        handleYnameChange={handleYnameChange}
        handleXnameChange={handleXnameChange}
        dashboards={dashboards}
        setDashboards={setDashboards}
        setData={setData}
      />
      <div className="chart">
        <ResponsiveContainer width="100%" height={400}>
          <LineChart margin={{ top: 30, right: 30, left: 30, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={selectedOption2?.value} domain={[0, 1000]} label={{ value: Xname?.value, position: 'insideBottom', offset: -15 }} />
            <YAxis label={{ value: Yname?.value, angle: -90, position: 'insideLeft', offset: 8, dy: 100 }} />
            {data.map((series, index) => (
              <Line key={index} data={series} dot={false} activeDot={{ stroke: 'blue', strokeWidth: 2, r: 5 }} type="monotone" dataKey={selectedOption?.value} />
            ))}
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Chart;

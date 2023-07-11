import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Chart = () => {
  
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchJSONData = async () => {
      try {
        const response = await axios.get('https://lobis.github.io/gas-files/files/mixtures/Ar-CH4/Ar_80.0-CH4_20.0.gas.json');
        const rawData = Array.isArray(response.data) ? response.data : [response.data];
        const formattedData = rawData.map((item) => ({
          'Electric Field': item.electric_field,
          'Drift Velocity': item.electron_drift_velocity,
          'Diffusion Coefficient': item.electron_longitudinal_diffusion,
        }));
        const combinedData = formattedData[0]['Drift Velocity'].map((driftVelocity, index) => ({
          'Drift Velocity': Math.round(driftVelocity * 100) / 100,
          'Electric Field': Math.round(formattedData[0]['Electric Field'][index] * 100) / 100,
          'Diffusion Coefficient': Math.round(formattedData[0]['Diffusion Coefficient'][index] * 100) / 100,
          
        }));

        setData(combinedData);
        console.log('Veri çekme başarılı:', combinedData);

      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };

    fetchJSONData();
  }, []);

  return (
    <div>
      <ResponsiveContainer width="50%" height={400} >
      <LineChart width={1000} height={700} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="5 5" />
        <XAxis dataKey="Electric Field" label={{ value: 'Electric Field [V/cm]', position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: 'Drift Velocity (cm/μs)', angle: -90, position: 'insideLeft' }} />
        <Line type="linear" dataKey="Drift Velocity" stroke="green"/>
        <Tooltip />
      </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
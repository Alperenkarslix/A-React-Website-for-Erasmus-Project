import { useEffect } from 'react';
import axios from 'axios';

const API = ({ dashboards, setData, setDataX }) => {
  useEffect(() => {
    const fetchJSONData = async () => {
      try {
        const combinedData = [];
        for (const dashboard of dashboards) {
          const url = `https://lobis.github.io/gas-files/files/mixtures/${dashboard.firstGas}-${dashboard.secondGas}/${dashboard.firstGas}_${dashboard.valueFirstGas}-${dashboard.secondGas}_${dashboard.valueSecondGas}.gas.json`;
          const response = await axios.get(url);
          const rawData = Array.isArray(response.data) ? response.data : [response.data];
          const formattedData = rawData.map((item) => ({
            'Electric Field': item.electric_field,
            'Drift Velocity': item.electron_drift_velocity,
            'Diffusion Coefficient': item.electron_longitudinal_diffusion,
            'Transversal Diffusion': item.electron_transversal_diffusion,
            'Pressure': item.pressure,
          }));
          
          combinedData.push(
            formattedData[0]['Drift Velocity'].map((electron_drift_velocity, index) => ({
              'Drift Velocity': Math.round(formattedData[0]['Drift Velocity'][index] * 100) / 100,
              'Electric Field': Math.round(formattedData[0]['Electric Field'][index] * 100) / 1000,
              'Diffusion Coefficient': formattedData[0]['Diffusion Coefficient'][index],
              'Transversal Diffusion': formattedData[0]['Transversal Diffusion'][index],
            }))
          );
        }

        setData(combinedData);
        console.log('Veri çekme başarılı:', combinedData);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        alert('Data does not exist. Please try again.');
      }
    };

    fetchJSONData();
  }, [dashboards, setData]);

  return null; // The API component doesn't render anything
};

export default API;

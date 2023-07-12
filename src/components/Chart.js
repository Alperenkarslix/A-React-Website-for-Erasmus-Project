import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import '../style/Chart.css';

const Chart = () => {
  const [data, setData] = useState([]); 
  const [selectedOption, setSelectedOption] = useState({ value: 'Drift Velocity', label: 'Drift Velocity' });
  const [Yname, setYname] = React.useState({ value: '', label: '' });
  const [checked, setChecked] = React.useState(false);
  const [Xname, setXname] = React.useState({ value: '', label: '' });
  const [dataX , setDataX] = useState([]);

useEffect(() => {
  if (selectedOption?.value === 'Drift Velocity') {
    setYname({ value: 'Drift Velocity [cm^2/s]', label: 'Drift Velocity [cm^2/s]' })
  }
  if (selectedOption?.value === 'Diffusion Coefficient') {
    setYname({ value: 'Diffusion Coefficient [cm^2/s]', label: 'Diffusion Coefficient [cm^2/s]' })
  }
  if (selectedOption?.value === 'Transversal Diffusion') {
    setYname({  value: 'Diffusion Coefficient [cm^2/s]', label: 'Diffusion Coefficient [cm^2/s]' })
  }
}, [selectedOption])
useEffect(() => {
  if (checked === true) {
    setDataX('Electric Field' / 'Pressure');
    setXname({ value: 'Electric Field / Pressure [V/cm/bar]', label: 'Electric Field / Pressure [V/cm/bar]' });
  }
  if (checked === false) {
    setDataX('Electric Field');
    setXname({ value: 'Electric Field [V/cm]', label: 'Electric Field [V/cm]' });
  }
}, [checked])
useEffect(() => {
    const fetchJSONData = async () => {
      try {
        const response = await axios.get('https://lobis.github.io/gas-files/files/mixtures/Ar-CH4/Ar_80.0-CH4_20.0.gas.json');
        const rawData = Array.isArray(response.data) ? response.data : [response.data];
        const formattedData = rawData.map((item) => ({
          'Electric Field': item.electric_field,
          'Drift Velocity': item.electron_drift_velocity,
          'Diffusion Coefficient': item.electron_longitudinal_diffusion,
          'Transversal Diffusion': item.electron_transversal_diffusion,
          'Pressure': item.pressure,
        }));
        const combinedData = formattedData[0]['Drift Velocity'].map((driftVelocity, index) => ({
          'Drift Velocity': formattedData[0]['Drift Velocity'][index],
          'Electric Field': Math.round(formattedData[0]['Electric Field'][index] * 100) / 1000,
          'Diffusion Coefficient': formattedData[0]['Diffusion Coefficient'][index],
          'Transversal Diffusion': formattedData[0]['Transversal Diffusion'][index],
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
    <body>
      <div className="options">
        <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Graph Options</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue={'Drift Velocity'}
        name="radio-buttons-group"
        onChange={(e) => setSelectedOption({ value: e.target.value})}>
        <FormControlLabel value={'Drift Velocity'} control={<Radio />} label="Drift Velocity" />
        <FormControlLabel value={'Diffusion Coefficient'} control={<Radio />} label="Diffusion Coefficient" />
        <FormControlLabel value={'Transversal Diffusion'} control={<Radio />} label="Transversal Diffusion" />
      </RadioGroup>
    </FormControl>
    <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Reduced Electric Field" />
      </div>
      <div>
      <ResponsiveContainer width="100%" height={400} >
      <LineChart width={1000} height={700} data={data} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={dataX} label={{ value: Xname?.value, position: 'insideBottom', offset: -15 }} />
        <YAxis label={{ value: Yname?.value, angle: -90, position: 'insideLeft', offset: 8 , dy: 100 }} />
        <Line type="monotone" dataKey={selectedOption?.value} stroke="#8884d8" />
        <Tooltip />
      </LineChart>
      </ResponsiveContainer>
      </div>
    </body>
    </div>
  );
};

export default Chart;
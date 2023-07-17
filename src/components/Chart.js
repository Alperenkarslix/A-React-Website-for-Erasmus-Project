import React, { useEffect, useState } from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import '../style/Chart.css';
import Slider from '@mui/material/Slider';

const Chart = () => {
  const [data, setData] = useState([]); 
  const [selectedOption, setSelectedOption] = useState({ value: 'Drift Velocity', label: 'Drift Velocity' });
  const [Yname, setYname] = useState({ value: '', label: '' });
  const [checked, setChecked] = useState(false);
  const [Xname, setXname] = useState({ value: '', label: '' });
  const [dataX , setDataX] = useState([]);
  const [firstGas, setFirstGas] = useState('Ar');
  const [secondGas, setSecondGas] = useState('C4H10');
  const [valueFirstGas, setValueFirstGas] = useState(80);
  const [valueSecondGas, setValueSecondGas] = useState(20);
  const url = `https://lobis.github.io/gas-files/files/mixtures/${firstGas}-${secondGas}/${firstGas}_80.0-${secondGas}_20.0.gas.json`;
 
 
  const handleChange = (event) => { 
      setFirstGas(event.target.value);
  };
  const handleChange2 = (event) => {
      setSecondGas(event.target.value);
  }; 
  const handleChange3 = (event) => {  
      setValueFirstGas(event.target.value);
  };
  const handleChange4 = (event) => {
      setValueSecondGas(event.target.value);
  };



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
        const response = await axios.get(url);
        const rawData = Array.isArray(response.data) ? response.data : [response.data];
        const formattedData = rawData.map((item) => ({
          'Electric Field': item.electric_field,
          'Drift Velocity': item.electron_drift_velocity,
          'Diffusion Coefficient': item.electron_longitudinal_diffusion,
          'Transversal Diffusion': item.electron_transversal_diffusion,
          'Pressure': item.pressure,
        }));
        const combinedData = formattedData[0]['Drift Velocity'].map((electron_drift_velocity, index) => ({
          'Drift Velocity': Math.round(formattedData[0]['Drift Velocity'][index] * 100) / 100,
          'Electric Field': Math.round(formattedData[0]['Electric Field'][index] * 100) / 1000,
          'Diffusion Coefficient': formattedData[0]['Diffusion Coefficient'][index], 
          'Transversal Diffusion': formattedData[0]['Transversal Diffusion'][index],
        }));
        setData(combinedData);
        console.log('Veri çekme başarılı:', combinedData);
      } catch (error) {
        console.error('Veri çekme hatası:', error);
        alert('Data is not exist. Please try again.');
      }
    };
    fetchJSONData();
  }, [url,firstGas,secondGas,]
);
  return (
    <div>
      <div className="chart-options">
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
        <div>
        <FormControl>
              <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Reduced Electric Field" />
        </FormControl>
        </div>
        <div>
        <Box sx={{ maxWidth: 120 , minWidth:120}}>
        <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">First Gas</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            defaultValue="None"
            value={firstGas}
            label="First Gas"
            onChange={handleChange}
            >
                <MenuItem value={''}>None</MenuItem>
                <MenuItem value={'Ar'}>Ar</MenuItem>
                <MenuItem value={'He'}>He</MenuItem>
                <MenuItem value={'Kr'}>Kr</MenuItem>
                <MenuItem value={'Ne'}>Ne</MenuItem>
                <MenuItem value={'Xe'}>Xe</MenuItem>
            </Select>
        </FormControl>
        <Typography  textAlign={'center'} fontSize={15} id="input-slider" gutterBottom > First Gas Ratio </Typography>
        <Slider
        aria-label="First Gas"
        defaultValue={80}
        min={80}
        max={100}
        step={null}
        valueLabelDisplay="auto"
        onChange={handleChange3}
      />
        </Box>
        </div>
        <div>
      <Box sx={{ maxWidth: 120 , minWidth:120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Second Gas</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          defaultValue="None"
          value={secondGas}
          label="First Gas"
          onChange={handleChange2}
        >
            <MenuItem value={''}>None</MenuItem>
            <MenuItem value={'CH4'}>CH4</MenuItem>
            <MenuItem value={'C4H10'}>C4H10</MenuItem>
        </Select>
      </FormControl>
      <Typography textAlign={'center'} fontSize={14} id="input-slider" gutterBottom> Second Gas Ratio</Typography>
      <Slider
        aria-label="First Gas"
        defaultValue={0}
        min={0}
        max={20}
        step={null}
        valueLabelDisplay="auto"
        onChange={handleChange4}
      />
    </Box>
    </div>
    </div>
      <div className="chart">
        Gas: {firstGas} - {secondGas} <br />
        X and Y Axis:  {selectedOption?.value} and { Xname?.value} <br />
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
    </div>

  );
};

export default Chart;
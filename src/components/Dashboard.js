// Dashboard.js
import React, { useEffect } from 'react';
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
import Slider from '@mui/material/Slider';

const Dashboard = ({
  selectedOption,
  setSelectedOption,
  checked,
  setChecked,
  logarithmic,
  setLogarithmic,
  firstGas,
  setFirstGas,
  secondGas,
  setSecondGas,
  valueFirstGas,
  setChangingValueFirstGas,
  changingValueFirstGas,
  valueSecondGas,
  setChangingValueSecondGas,
  changingValueSecondGas,
  handleYnameChange,
  setDataX,
  DataX,
  setValueFirstGas,
  setValueSecondGas,
  setXname,

}) => {
  useEffect(() => {
    if (selectedOption?.value === 'Drift Velocity') {
      handleYnameChange({ value: 'Drift Velocity [cm²/s]', label: 'Drift Velocity [cm²/s]' });
    }
    if (selectedOption?.value === 'Diffusion Coefficient') {
      handleYnameChange({ value: 'Diffusion Coefficient [cm²/s]', label: 'Diffusion Coefficient [cm²/s]' });
    }
    if (selectedOption?.value === 'Transversal Diffusion') {
      handleYnameChange({ value: 'Diffusion Coefficient [cm²/s]', label: 'Diffusion Coefficient [cm²/s]' });
    }
  }, [selectedOption, handleYnameChange]);

  useEffect(() => {
    if (checked === true) {
      setDataX('Electric Field' / 'Pressure');
      setXname({ value: 'Electric Field / Pressure [V/cm/bar]', label: 'Electric Field / Pressure [V/cm/bar]' });
    }
    if (checked === false) {
      setDataX('Electric Field');
      setXname({ value: 'Electric Field [V/cm]', label: 'Electric Field [V/cm]' });
    }
  }, [checked , setDataX, setXname]);
  
  useEffect(() => {
    if (logarithmic === true) {
      setDataX(Math.log10('Electric Field'));
    }
    if (logarithmic === false) {
      setDataX('Electric Field');
    }
  }, [logarithmic , setDataX]);

  const handleFirstGasChange = (event) => {
    setFirstGas(event.target.value);
  };

  const handleSecondGasChange = (event) => {
    setSecondGas(event.target.value);
  };

  const handleFirstGasSliderChange = (event, newValue) => {
    const formattedValue = newValue.toFixed(1);
    setChangingValueFirstGas(formattedValue);
    setChangingValueSecondGas((100.0 - newValue).toFixed(1));
  };

  const handleSecondGasSliderChange = (event, newValue) => {
    const formattedValue = newValue.toFixed(1);
    setChangingValueSecondGas(formattedValue);
    setChangingValueFirstGas((100.0 - newValue).toFixed(1));
  };

  const handleFirstGasMouseUp = () => {
    setValueFirstGas(changingValueFirstGas);
    setValueSecondGas((100.0 - changingValueFirstGas).toFixed(1));
    console.log('Değer değişti:', valueFirstGas);
  };

  const handleSecondGasMouseUp = () => {
    setValueSecondGas(changingValueSecondGas);
    setValueFirstGas((100.0 - changingValueSecondGas).toFixed(1));
    console.log('Değer değişti:', valueSecondGas);
  };

  return (
    <div className="chart-options">
      <FormControl>
        <FormLabel id="demo-radio-buttons-group-label">Graph Options</FormLabel>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={'Drift Velocity'}
          name="radio-buttons-group"
          onChange={(e) => setSelectedOption({ value: e.target.value })}
        >
          <FormControlLabel value={'Drift Velocity'} control={<Radio />} label="Drift Velocity" />
          <FormControlLabel value={'Diffusion Coefficient'} control={<Radio />} label="Diffusion Coefficient" />
          <FormControlLabel value={'Transversal Diffusion'} control={<Radio />} label="Transversal Diffusion" />
        </RadioGroup>
      </FormControl>
      <div>
        <FormControl>
          <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />} label="Reduced Electric Field" />
          <FormControlLabel control={<Switch checked={logarithmic} onChange={(e) => setLogarithmic(e.target.checked)} />} label="Logarithmic Scale" />
        </FormControl>
      </div>
      <div>
        <Box sx={{ maxWidth: 120, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">First Gas</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="None"
              value={firstGas}
              label="First Gas"
              onChange={handleFirstGasChange}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'Ar'}>Ar</MenuItem>
              <MenuItem value={'He'}>He</MenuItem>
              <MenuItem value={'Kr'}>Kr</MenuItem>
              <MenuItem value={'Ne'}>Ne</MenuItem>
              <MenuItem value={'Xe'}>Xe</MenuItem>
            </Select>
          </FormControl>
          <Typography textAlign={'center'} fontSize={15} id="input-slider" gutterBottom>
            First Gas Ratio
          </Typography>
          <Slider
            aria-label="First Gas"
            defaultValue={80}
            min={80}
            max={100}
            step={0.5}
            valueLabelDisplay="auto"
            value={changingValueFirstGas}
            onChange={handleFirstGasSliderChange}
            onMouseUp={handleFirstGasMouseUp}
          />
        </Box>
      </div>
      <div>
        <Box sx={{ maxWidth: 120, minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Second Gas</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="None"
              value={secondGas}
              label="First Gas"
              onChange={handleSecondGasChange}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'CH4'}>CH4</MenuItem>
              <MenuItem value={'C4H10'}>C4H10</MenuItem>
            </Select>
          </FormControl>
          <Typography textAlign={'center'} fontSize={14} id="input-slider" gutterBottom>
            Second Gas Ratio
          </Typography>
          <Slider
            aria-label="First Gas"
            defaultValue={0}
            min={0}
            max={20}
            step={0.5}
            valueLabelDisplay="auto"
            value={changingValueSecondGas}
            onChange={handleSecondGasSliderChange}
            onMouseUp={handleSecondGasMouseUp}
          />
        </Box>
      </div>
    </div>
  );
};

export default Dashboard;

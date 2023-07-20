// Dashboard.js
import React, { useEffect } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import InputLabel from '@mui/material/InputLabel';
import Slider from '@mui/material/Slider';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import '../style/Dashboard.css';


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
    <div>
      <div className="table-container">
        <Table className="table">
          <TableHead>
            <TableRow>
              <TableCell>Graph Options</TableCell>
              <TableCell>Reduced Electric Field</TableCell>
              <TableCell>Logarithmic Scale</TableCell>
              <TableCell>First Gas</TableCell>
              <TableCell>First Gas Ratio</TableCell>
              <TableCell>Second Gas</TableCell>
              <TableCell>Second Gas Ratio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormControl component="fieldset">
                  <RadioGroup
                    aria-label="graph-options"
                    defaultValue="Drift Velocity"
                    name="graph-options"
                    onChange={(e) => setSelectedOption({ value: e.target.value })}
                  >
                    <FormControlLabel value="Drift Velocity" control={<Radio />} label="Drift Velocity" />
                    <FormControlLabel value="Diffusion Coefficient" control={<Radio />} label="Diffusion Coefficient" />
                    <FormControlLabel value="Transversal Diffusion" control={<Radio />} label="Transversal Diffusion" />
                  </RadioGroup>
                </FormControl>
              </TableCell>
              <TableCell>
                <FormControlLabel control={<Switch checked={checked} onChange={(e) => setChecked(e.target.checked)} />} />
              </TableCell>
              <TableCell>
                <FormControlLabel control={<Switch checked={logarithmic} onChange={(e) => setLogarithmic(e.target.checked)} />} />
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">First Gas</InputLabel>
                  <Select value={firstGas} onChange={handleFirstGasChange}label="First Gas"labelId="demo-simple-select-label"id="demo-simple-select"
                    >
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="Ar">Ar</MenuItem>
                    <MenuItem value="He">He</MenuItem>
                    <MenuItem value="Kr">Kr</MenuItem>
                    <MenuItem value="Ne">Ne</MenuItem>
                    <MenuItem value="Xe">Xe</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Box sx={{ maxWidth: 120, minWidth: 120 }}>
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
              </TableCell>
              <TableCell>
                <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Second Gas</InputLabel>
                  <Select value={secondGas} onChange={handleSecondGasChange} label="Second Gas" labelId="demo-simple-select-label" id="demo-simple-select">
                    <MenuItem value="">None</MenuItem>
                    <MenuItem value="CH4">CH4</MenuItem>
                    <MenuItem value="C4H10">C4H10</MenuItem>
                  </Select>
                </FormControl>
              </TableCell>
              <TableCell>
                <Box sx={{ maxWidth: 120, minWidth: 120 }}>
                  <Slider
                    aria-label="Second Gas"
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
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        </div>
    </div>
  );
};

export default Dashboard;

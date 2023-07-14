import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';



const Selector = () => {
const [gasList, setGasList] = useState([]);
const [selectedOption, setSelectedOption] = useState(null);

const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
        useEffect(() => {
            axios.get("https://lobis.github.io/gas-files/files/list.json")
            .then((response) => {
            const gasList = response.data.map((item) => ({
                'Gas Name': item.name,
                'Gas URL': item.url,
            }));
                setGasList(gasList);
            })
            .catch((error) => {
                console.log(error);
                }
            );
        }, []);
        useEffect(() => {
            if (selectedOption) {
                const selectedGas = gasList.find(gas => gas['Gas Name'] === selectedOption);
                const gasUrl = selectedGas['Gas URL'];
            
                axios.get(gasUrl)
                .then((response) => {
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
                    console.log('Data:', combinedData);
            });
        }
        }, [selectedOption , gasList]);
return (
    <div>
    <Box sx={{ minWidth: 120, maxWidth:200 }}>
      <FormControl fullWidth>
        <InputLabel variant="filled" htmlFor="uncontrolled-native">
          Select Gas
        </InputLabel>
        <NativeSelect
            defaultValue={null}
            inputProps={{
                name: 'name',
                id: 'uncontrolled-native',
                }}
          selectedOption={selectedOption}
          onChange={handleChange}
        >
            {gasList.map((item) => (
                <option key={item['Gas Name']} value={item['Gas Name']}>
                    {item['Gas Name']}
                </option>
            ))}
            

        </NativeSelect>
      </FormControl>
    </Box>
    </div>
  );
};

export default Selector;


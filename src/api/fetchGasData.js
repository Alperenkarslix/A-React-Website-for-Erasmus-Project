import axios from "axios";

const fetchGasData = async (selectedOption, gasList) => {
  if (selectedOption && gasList) {
    const selectedGas = gasList.find((gas) => gas['Gas Name'] === selectedOption);
    const gasUrl = selectedGas['Gas URL'];

    try {
      const response = await axios.get(gasUrl);
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
      return combinedData;
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  return [];
};

export default fetchGasData;

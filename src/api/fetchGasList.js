import axios from "axios";

const fetchGasList = async () => {
  try {
    const response = await axios.get("https://lobis.github.io/gas-files/files/list.json");
    const gasList = response.data.map((item) => ({
      'Gas Name': item.name,
      'Gas URL': item.url,
    }));
    return gasList;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default fetchGasList;

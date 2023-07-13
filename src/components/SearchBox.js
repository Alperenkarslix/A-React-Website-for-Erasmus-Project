import React, { useState } from 'react';
import '../style/SearchBox.css';

function SearchBox() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    fetch(`https://lobis.github.io/gas-files/files/mixtures/Ar-C4H10/${searchText}.gas.json`)
      .then((response) => response.json())
      .then((data) => console.log(data));
   console.log('Arama metni:', searchText);
    // You can call another function here or do other operations if you want
  };

  return (
    <div className="box">
      <form name="search" onSubmit={handleFormSubmit}>
        <input
          type="text"
          className="input"
          name="txt"
          value={searchText}
          onChange={handleInputChange}
        />
           <button type="submit" className='fas fa-search'> </button>
      </form>
   
    </div>
  );
}

export default SearchBox;

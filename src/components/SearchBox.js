import React, { useState } from 'react';
import '../style/Navbar.css'

function SearchBox() {
  const [searchText, setSearchText] = useState('');

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform the search you want to do here or do something else 
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

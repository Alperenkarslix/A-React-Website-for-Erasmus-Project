import "../style/navbar.css"
import React, { useState } from 'react';
function Navbar(){
        var [query, setQuery] = useState('');

        const handleInputChange = (event) => {
            setQuery(event.target.value);
        };

        const handleSubmit = (event) => {
            event.preventDefault();
            if (query === '') {
                alert('Please enter a search term.');
                return;
            }
            console.log('Search query:', query);
        };
            
    return(
        <nav>
        <div className="logo">
         <span>Gas Graphs</span>
        </div>
        <ul className="nav-links">
            <li><a href="/" >Home</a></li>
            <li><a href="https://github.com/lobis">Contact</a></li>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleInputChange}
                />
            </form>
        </ul>
    </nav>
    )
}
export default Navbar;
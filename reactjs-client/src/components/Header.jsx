import React, { useState } from 'react';
import './Header.css'; // Import your CSS file

const Header = ({employees : data}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const inputHandler = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = data.filter(item => 
            item.name.toLowerCase().includes(query) || 
            item.emailadress.toLowerCase().includes(query) ||
            item.phonenumber.includes(query) || 
            item.ID.toString().includes(query)
        );
        setFilteredData(filtered);
    };

    return (
        <header className="header">
            <div className="container">
                <nav className="navbar">
                    <div className="logo">
                        {/* <a href="#" title="">
                            <img src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg" alt="Logo" />
                        </a> */}
                        Employee App <sub><small>v6</small></sub>
                    </div>                   

                    <div className="nav-links">
                        <a href="#" className="nav-link">
                            <input
                                type="text"
                                onChange={inputHandler}
                                placeholder='Search'
                                value={searchQuery}
                            />
                        </a>                        
                    </div>
                    {console.log("Filtered: ", filteredData)}

                    {/* <div className="auth-links">
                        <a href="#" className="nav-link">Sign up</a>
                        <a href="#" className="nav-link">Sign in</a>
                    </div> */}
                </nav>                
            </div>
        </header>
    );
};

export default Header;

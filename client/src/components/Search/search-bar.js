import React, { useState } from 'react';

// SearchBar component to handle postcode input and sorting preferences.
function SearchBar({ onSearch, onSortChange, currentSort }) {
    const [postcode, setPostcode] = useState('');

     // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default form submit behavior.
        onSearch(postcode); // Trigger the onSearch function passed as a prop.
    };


     // Render the search bar with an input for postcode, a select for sorting, and a search button.
    return (
        <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
            <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter postcode"
                required
                style={{ padding: '10px', margin: '5px' }}
            />
            <select value={currentSort} onChange={(e) => onSortChange(e.target.value)} style={{ padding: '10px', margin: '5px' }}>
                <option value="rating">Sort by Rating</option>
                <option value="distance">Sort by Distance</option>
            </select>
            <button type="submit" style={{ padding: '10px', backgroundColor: 'orange', color: 'white', border: 'none', cursor: 'pointer' }}>
                Jet Search
            </button>
        </form>
    );
}

export default SearchBar;

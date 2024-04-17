import React, { useState } from 'react';

function SearchBar({ onSearch, onSortChange, currentSort }) {
    const [postcode, setPostcode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(postcode);
    };

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

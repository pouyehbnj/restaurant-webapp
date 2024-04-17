import React, { useState } from 'react';

function SearchBar({ onSearch }) {
    const [postcode, setPostcode] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(postcode, 0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="Enter postcode"
                required
            />
            <button type="submit">Search</button>
        </form>
    );
}

export default SearchBar;

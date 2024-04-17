import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';

function App() {
    const [restaurants, setRestaurants] = useState([]);

    const handleSearch = async (postcode) => {
        
        try {
            console.log('hello');
            console.log('Searching for:', postcode);
            const response = await fetch(`/api/restaurants/${postcode}`);
            // console.log(response);
            const data = await response.json();
            setRestaurants(data);
        } catch (error) {
            console.log(error)
            console.error('Failed to fetch restaurants:');
        }
    };

    return (
        <div className="App">
            <h1>Welcome to Restaurant Finder</h1>
            <SearchBar onSearch={handleSearch} />
            <RestaurantList restaurants={restaurants} />
        </div>
    );
}

export default App;

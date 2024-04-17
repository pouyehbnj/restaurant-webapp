import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import RestaurantList from './components/RestaurantList';
import Pagination from './components/Pagination';

function App() {
    const [restaurants, setRestaurants] = useState([]);
    const [total, setTotal] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [postcode, setPostcode] = useState('');

    const handleSearch = async (postcode, page = 0) => {
        setPostcode(postcode);
        setCurrentPage(page);
        try {
            const response = await fetch(`/api/restaurants/${postcode}?page=${page}`);
            const data = await response.json();
            setRestaurants(data.restaurants);
            setTotal(data.total);
        } catch (error) {
            console.error('Failed to fetch restaurants:', error);
        }
    };

    const handlePageChange = (page) => {
        handleSearch(postcode, page);
    };

    return (
        <div className="App">
            <h1>Welcome to Restaurant Finder</h1>
            <SearchBar onSearch={handleSearch} />
            <RestaurantList restaurants={restaurants} />
            <Pagination total={total} currentPage={currentPage} onPageChange={handlePageChange} />
        </div>
    );
}

export default App;

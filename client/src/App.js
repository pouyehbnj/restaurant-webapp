import React, { useState } from 'react';
import SearchBar from './components/Search/SearchBar';
import RestaurantList from './components/List/RestaurantList';
import Pagination from './components/Pagination/Pagination';
import './App.css';
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

    const handlePageChange = (newPage) => {
      setCurrentPage(newPage);
      handleSearch(postcode, newPage); // Assuming postcode is maintained elsewhere or globally accessible
  };

    return (
      <div className="App" style={{ textAlign: 'center' }}>
          <img src="/header.png" alt="Header" className="header-image" />
          <h1>Welcome to JET Restaurant Finder</h1>
          <SearchBar onSearch={handleSearch} />
          <RestaurantList restaurants={restaurants} />
          {total > 0 && <Pagination total={total} currentPage={currentPage} onPageChange={handlePageChange} />}
      </div>
  );
}

export default App;

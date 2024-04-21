//Importing components and dependencies
import React, { useState, useEffect } from 'react';
import SearchBar from './components/Search/search-bar';
import RestaurantList from './components/List/restaurant-list';
import Pagination from './components/Pagination/pagination';
import Filter from './components/Filter/filter';
import './App.css';

function App() {
  // State management hooks for various aspects of the application
  const [restaurants, setRestaurants] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [postcode, setPostcode] = useState('');
  const [sort, setSort] = useState('rating');
  const [paginationStart, setPaginationStart] = useState(0);
  const [isOpen, setIsOpen] = useState(null);
  const [cuisine, setCuisine] = useState(null);
  const [error, setError] = useState(null);

  // Effect hook to fetch restaurant data when dependencies change
  useEffect(() => {
    if (postcode) {
      fetchRestaurants(postcode, currentPage, sort, isOpen, cuisine);
    }
  }, [postcode, currentPage, sort, isOpen, cuisine]);

  // Fetch restaurants from the backend
  const fetchRestaurants = async (postcode, page, sort, isOpen, cuisine) => {

    const API_URL = process.env.BACKEND_URL || 'http://localhost:5000';
    let query = `${API_URL}/api/restaurants/${postcode}?`;
    query += `page=${page || 0}`; // Default to page 0 if undefined
    query += `&sort=${sort || 'rating'}`; // Default to 'rating' if undefined
    if (isOpen !== null) query += `&isOpen=${isOpen}`; // Only add if not null
    if (cuisine) query += `&cuisine=${cuisine}`; // Only add if not null

    try {

      const response = await fetch(query);
      if (!response.ok) {
        throw new Error(response.status);
      }

      const data = await response.json();
      setError(null);
      setRestaurants(data.restaurants || []);
      setTotal(data.total);
      if (page === 0 || page % 10 === 0) {
        setPaginationStart(page);
      }
      if (currentPage >= Math.ceil(data.total / 10)) {
        setCurrentPage(0);
      }
    } catch (error) {
      console.error('Failed to fetch restaurants:', error.message);
      setRestaurants([]);
      setTotal(0);
      if (error.message.includes('400')) {
        setError('Invalid postcode format. Please enter a correct postcode.');
      } else {
        setError('Server Error, please try again!');
      }

    }
  };

// Handlers for user interactions

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'isOpen') {
      setIsOpen(value); 
      fetchRestaurants(postcode, 0, sort, value, cuisine); // Fetch immediately on filter change
    } else if (filterType === 'cuisine') {
      setCuisine(value); 
      fetchRestaurants(postcode, 0, sort, isOpen, value); // Fetch immediately on filter change
    }
    setCurrentPage(0);
    setPaginationStart(0);
  };

  const handleSearch = (postcode) => {
    const cleanedPostcode = postcode.trim().replace(/\s+/g, "");
    setPostcode(cleanedPostcode);
    setCurrentPage(0);
  };

  const handleSortChange = (sortType) => {
    if (sortType !== sort) {
      setSort(sortType);
      setCurrentPage(0);
      console.log("changed current page");
      setPaginationStart(0);
      console.log("changed pagination");
      fetchRestaurants(postcode, 0, sortType, isOpen, cuisine); // Fetch immediately on sort change
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Rendering the components of the application
  return (
    <div className="App">
      <img src="/header.png" alt="Header" className="header-image" />
      <h1>Welcome to JET Restaurant Finder</h1>
      <SearchBar onSearch={handleSearch} onSortChange={handleSortChange} currentSort={sort} />
      <Filter onFilterChange={(filterType, value) => handleFilterChange(filterType, value)} />
      {error && <div className="error-message">
        <p>{error}</p>
        <img src="https://media0.giphy.com/media/3ohzdFCn9mYfmuAmEU/200w_s.gif?cid=8d8c03589fnhmi01ajythtj6lluw6ng0v60wrm4oz4hzjpio&ep=v1_gifs_search&rid=200w_s.gif&ct=g" alt="Error" />
      </div>}
      {!error && <RestaurantList restaurants={restaurants} />}
      {!error && total > 0 && (
        <Pagination
          total={total}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          startPageIndex={paginationStart}
          setStartPageIndex={setPaginationStart}
        />
      )}
    </div>
  );
}

export default App;
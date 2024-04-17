import React, { useState, useEffect } from 'react';
import SearchBar from './components/Search/SearchBar';
import RestaurantList from './components/List/RestaurantList';
import Pagination from './components/Pagination/Pagination';
import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [postcode, setPostcode] = useState('');
  const [sort, setSort] = useState('rating');
  const [paginationStart, setPaginationStart] = useState(0);

  useEffect(() => {
    if (postcode) { 
    fetchRestaurants(postcode, currentPage, sort);
    }
  }, [postcode, currentPage, sort]);

  const fetchRestaurants = async (postcode, page, sort) => {
    try {
      const response = await fetch(`/api/restaurants/${postcode}?page=${page}&sort=${sort}`);
      const data = await response.json();
      setRestaurants(data.restaurants || []);
      setTotal(data.total);
      // setPaginationStart(page * 10 < total ? page * 10 : 0);
      if (page === 0 || page % 10 === 0) {
        setPaginationStart(page);
    }
      
    } catch (error) {
    
      console.error('Failed to fetch restaurants:');
      console.log(error);
    }
  };

  const handleSearch = (postcode) => {
    setPostcode(postcode);
    setCurrentPage(0);
  };

  const handleSortChange = (sortType) => {
    if (sortType !== sort) {
      setSort(sortType);
      setCurrentPage(0);
      console.log("changed current page");
      setPaginationStart(0);
      console.log("changed pagination");
      fetchRestaurants(postcode, 0, sortType);
      console.log("fetched"); // Fetch immediately on sort change
  }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="App">
      <img src="/header.png" alt="Header" className="header-image" />
      <h1>Welcome to JET Restaurant Finder</h1>
      <SearchBar onSearch={handleSearch} onSortChange={handleSortChange} currentSort={sort} />
      <RestaurantList restaurants={restaurants} />
      {total > 0 && (
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

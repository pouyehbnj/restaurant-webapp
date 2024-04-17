import React, { useState, useEffect } from 'react';
import SearchBar from './components/Search/SearchBar';
import RestaurantList from './components/List/RestaurantList';
import Pagination from './components/Pagination/Pagination';
import Filter from './components/Filter/Filter';
import './App.css';

function App() {
  const [restaurants, setRestaurants] = useState(null);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [postcode, setPostcode] = useState('');
  const [sort, setSort] = useState('rating');
  const [paginationStart, setPaginationStart] = useState(0);
  const [isOpen,setIsOpen]=useState(null);
  const [cuisine,setCuisine]=useState(null);

  useEffect(() => {
    if (postcode) {
      fetchRestaurants(postcode, currentPage, sort,isOpen,cuisine);
    }
  }, [postcode, currentPage, sort,isOpen,cuisine]);

  const fetchRestaurants = async (postcode, page, sort, isOpen, cuisine) => {
    let query = `/api/restaurants/${postcode}?`;
    query += `page=${page || 0}`; // Default to page 0 if undefined
    query += `&sort=${sort || 'rating'}`; // Default to 'rating' if undefined
    if (isOpen !== null) query += `&isOpen=${isOpen}`; // Only add if not null
    if (cuisine) query += `&cuisine=${cuisine}`; // Only add if not null

    try {
      const response = await fetch(query);
      const data = await response.json();
      setRestaurants(data.restaurants || []);
      setTotal(data.total);
      if (page === 0 || page % 10 === 0) {
        setPaginationStart(page);
      }
      if(currentPage>= Math.ceil(data.total / 10)){
        setCurrentPage(0);
      }
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    }
};

const handleFilterChange = (filterType, value) => {
  if (filterType === 'isOpen') {
    setIsOpen(value); // Assuming value is a boolean
    fetchRestaurants(postcode, 0, sort, value, cuisine);
  } else if (filterType === 'cuisine') {
    setCuisine(value); // Assuming value is a string
    fetchRestaurants(postcode, 0, sort, isOpen, value);
  }
  // Reset page to 0 whenever filters change
  setCurrentPage(0);
  setPaginationStart(0);
  // fetchRestaurants(postcode, 0, sort, isOpen, cuisine);
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
      fetchRestaurants(postcode, 0, sortType,isOpen, cuisine);
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
      <Filter onFilterChange={(filterType, value) => handleFilterChange(filterType, value)} />
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

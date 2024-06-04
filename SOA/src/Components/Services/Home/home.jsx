import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Card from "../../Elements/Card/Card";
import "./home.css";
import { useContext } from "react";
import axios from 'axios';
function Home() {
  const [rooms, setRooms] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [minSize, setMinSize] = useState("");
  const [maxSize, setMaxSize] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [capacity, setCapacity] = useState("");
  const [city, setCity] = useState("");
 const fetchPosts = async () => {
    try {
        const response = await axios.get('/api/Posts');
        if (response.data && response.data.success) {
            console.log(response.data);
            setRooms(response.data.post_list);
        } else {
            console.error('Failed to fetch posts');
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

// Fetch posts when component mounts
useEffect(() => {
    fetchPosts();
}, []);
  // Function to handle search
  const handleSearch = () => {
    // Filter rooms based on searchQuery
    const filteredRooms = rooms.filter(
      (room) =>
        room.title && room.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Update the state with filtered rooms
    setRooms(filteredRooms);
  };

  // Function to handle filtering
  const handleFilter = () => {
    console.log(minSize, maxSize, minPrice, maxPrice, capacity, city);
    const filteredRooms = rooms.filter((room) => {
      return (
        (!minSize || room.size >= parseInt(minSize)) &&
        (!maxSize || room.size <= parseInt(maxSize)) &&
        (!minPrice || room.price_per_hour >= parseInt(minPrice)) &&
        (!maxPrice || room.price_per_hour <= parseInt(maxPrice)) &&
        (!capacity || room.capacity >= parseInt(capacity)) &&
        (!city || room.location.toLowerCase().includes(city.toLowerCase()))
      );
    });

    setRooms(filteredRooms);
    if (filteredRooms.length === 0) alert("No rooms found") && setRooms(rooms);
    console.log(filteredRooms);
  };

  // Function to handle page refresh
  const handleRefresh = () => {
    window.location.reload();
  };

  // Function to toggle filter visibility
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <>
      <div className="bodyy">
        <div className="home">
          <h1>
            {!showFilters && (
              <div className="searchbar">
                <input
                  className="search-input"
                  variant="outlined"
                  fullWidth
                  label="Search"
                  placeholder="  Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="search-button"
                  onClick={handleSearch}
                >
                  Search
                </button>
                <button className="search-button" onClick={handleRefresh}>
                  Refresh
                </button>
                <button className="search-button" onClick={toggleFilters}>
                  Show Filters
                </button>
              </div>
            )}
            {showFilters && (
              <div className="filterbar">
                <button className="search-button" onClick={toggleFilters}>
                  Hide Filters
                </button>
                <input
                  type="text"
                  placeholder=" Minimum Size in m2...."
                  className="search-input"
                  value={minSize}
                  onChange={(e) => setMinSize(e.target.value)}
                />
                <input
                  type="text"
                  placeholder=" Maximum Size in m2...."
                  className="search-input"
                  value={maxSize}
                  onChange={(e) => setMaxSize(e.target.value)}
                />
                <input
                  type="text"
                  placeholder=" Minimum price/hour...."
                  className="search-input"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder=" Maximum price/hour...."
                  className="search-input"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
                <input
                  type="text"
                  placeholder=" Max Capacity...."
                  className="search-input"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                />
                <input
                  type="text"
                  placeholder=" City...."
                  className="search-input"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button className="filter-button" onClick={handleFilter}>
                  Filter
                </button>
              </div>
            )}
          </h1>
          <div className="cards">
            {/* Render rooms */}
            {Array.isArray(rooms) &&
              rooms.map((room) => <Card key={room._id} room={room} />)}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;

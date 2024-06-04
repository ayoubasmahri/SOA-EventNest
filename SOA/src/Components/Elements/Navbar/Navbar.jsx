import React, { useContext } from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import "./Navbar.css"; // Import the CSS file for Navbar styling
import SearchContext from "../Contexts/SearchContext";
import image from "../../../logosoa.png";
import { UserContext } from "../../Services/Auth/context/userContext";

function Navbar() {
  const location = useLocation();
  const {user}= useContext(UserContext);
  console.log(typeof(user));

  const { searchQuery, setSearchQuery } = useContext(SearchContext);
  const handleSearch = () => {
    console.log("Search query:", searchQuery);
  };

  // Check if user exists and is logged in
  const isLoggedIn = user && user.user && user.user.name;

  // Render the username if user is logged in
  const username = isLoggedIn ? user.user.name : "";

  return (
    <nav className="navbar">
      <div className="links">
        <img src={image} height={50} width={100} alt="" />

        <Link to="./Home" className="nav-link" id="home">
          Home
        </Link>
        <Link to="/Post" className="nav-link">
          Post
        </Link>
        <Link to="/Reservations" className="nav-link">
          My Reservations
        </Link>
      </div>
      <div>
        {/* Render the welcome message only if user is logged in */}
        {isLoggedIn && <h1>Welcome {user.user.name}!</h1>}
      </div>
    </nav>
  );
}

export default Navbar;

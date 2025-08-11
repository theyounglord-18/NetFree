import React from 'react';
import './index.css';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const logout = () => {
    Cookies.remove('token');
    // return <Navigate to="/register" />;
    navigate('/register');
  };
  return (
    <div className="navbar">
      <div className="logcat">
        <div className="logo">
          <h1>NetFREE</h1>
        </div>
        <div className="categories">
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <Link to="/tvshows">
            <h3>TV Shows</h3>
          </Link>
          <Link to="/sepmovies">
            <h3>Movies</h3>
          </Link>
          <Link to="/wishlist">
            <h3>Watch Later</h3>
          </Link>
        </div>
      </div>
      <div className="rightpart">
        <div className="search-container">
          <input type="search" placeholder="Search..." />
          <span className="search-icon">🔍</span>
        </div>
        <div className="authSec">
          <button className="auth " onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

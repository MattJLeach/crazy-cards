import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.scss';

const Homepage = () => {
  return (
    <div className="home-banner-container">
      <h1 className="company">Crazy Cards</h1>
      <div className="home-banner">
        <p className="strapline">Take control of your finances today</p>
        <Link to="/application" role="button" className="cta">Apply</Link>
      </div>
    </div>
  )
}

export default Homepage;
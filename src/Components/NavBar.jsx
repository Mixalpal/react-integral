import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container">
      <Link to="/" className="navbar-brand">Интеграл Калькулятор</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/graph" className="nav-link">График</Link>
          </li>
          <li className="nav-item">
            <Link to="/trapezoid-method" className="nav-link">Информация о методе</Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  );
};

export default NavBar;
import React from 'react';
import { Link, NavLink} from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/" exact className="nav-link" activeClassName="active">Интеграл</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/graph" className="nav-link" activeClassName="active">График</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/trapezoid-method" className="nav-link" activeClassName="active">Информация о методе</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
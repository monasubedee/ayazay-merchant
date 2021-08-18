import React from 'react';
import Logo from 'assets/Logo/ayazaywhite.png';
import home from '../../../Landingpage/components/home.module.css'
import { Link } from 'react-router-dom'
const Navbar = () => {

  return (
    <nav className={home.navbar__container}>
      <div className={home.navbar_header}>
        <div className={home.navbar_Logo}>
          <Link to="/">
            <img
              alt="logo"
              src={Logo}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

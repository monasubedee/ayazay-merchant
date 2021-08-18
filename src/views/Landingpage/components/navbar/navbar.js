import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import home from '../home.module.css';
import Logo from 'assets/Logo/ayazaywhite.png';
import mmFlag from 'assets/img/mmflag.png';
import enFlag from 'assets/img/usaflag.png';

const Navbar = ({ lang, changeLang, language }) => {
  const [click, setclick] = useState(false);
  const toggle = () => setclick(!click);

  const handleLanguageChange = () => {
    let val = '';
    if (language === 'en') {
      val = 'mm';
    } else {
      val = 'en';
    }
    console.log('VALU', val);
    changeLang(val);
  };

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
        <div className={home.navbar_categories}>
          <ul>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, x: '-5px', y: '5px' }}
            >
              <Link
                className={home.categories_Login}
                to="/auth/login"
              >{lang.login}</Link>
            </motion.li>
            <motion.li
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9, x: '-5px', y: '5px' }}
            >
              <Link
                className={home.categories_register}
                to="/auth/register"
              >{lang.Register}</Link>
            </motion.li>
            <li>
              <button
                className={home.categories_flag}
                onClick={handleLanguageChange}
                style={{ cursor: 'pointer' }}
                type="button"
              >
                {language !== 'en' ? (<img
                  alt="english-lang"
                  src={enFlag}
                  style={{ width: '32px', height: 'auto' }}
                />) : (<img
                  alt="myanmar-lang"
                  src={mmFlag}
                  style={{ width: '32px', height: 'auto' }}
                />)}
              </button>
            </li>
          </ul>
        </div>
        <div className={home.navicon_container}>
          <div
            className={home.navicon}
            onClick={() => toggle(!click)}
            onKeyPress={() => toggle(!click)}
            role="button"
          >
            <Link to="/">
              <svg
                height="28pt"
                version="1.1"
                viewBox="0 0 48 48"
                width="28pt"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <g>
                  <path
                    d="M 43 15 L 5 15 C 3.898438 15 3 14.101562 3 13 L 3 11 C 3 9.898438 3.898438 9 5 9 L 43 9 C 44.101562 9 45 9.898438 45 11 L 45 13 C 45 14.101562 44.101562 15 43 15 Z M 43 15 "
                    style={{
                      stroke: 'none', fillRule: 'nonzero', fill: 'rgb(100%,100%,100%)', fillOpacity: 1,
                    }}
                  />
                  <path
                    d="M 43 27 L 5 27 C 3.898438 27 3 26.101562 3 25 L 3 23 C 3 21.898438 3.898438 21 5 21 L 43 21 C 44.101562 21 45 21.898438 45 23 L 45 25 C 45 26.101562 44.101562 27 43 27 Z M 43 27 "
                    style={{
                      stroke: 'none', fillRule: 'nonzero', fill: 'rgb(100%,100%,100%)', fillOpacity: 1,
                    }}
                  />
                  <path
                    d="M 43 39 L 5 39 C 3.898438 39 3 38.101562 3 37 L 3 35 C 3 33.898438 3.898438 33 5 33 L 43 33 C 44.101562 33 45 33.898438 45 35 L 45 37 C 45 38.101562 44.101562 39 43 39 Z M 43 39 "
                    style={{
                      stroke: 'none', fillRule: 'nonzero', fill: 'rgb(100%,100%,100%)', fillOpacity: 1,
                    }}
                  />
                </g>
              </svg>
            </Link>
          </div>
        </div>
        {click && (
          <div className={home.navicondropdown}>
            <div className={home.navicondropdown_categories}>
              <ul>
                <li>
                  <Link to="/auth/login">{lang.login}</Link>
                </li>
                <li>
                  <Link to="/auth/register">{lang.Register}</Link>
                </li>
                <li>
                  <button
                    className={home.categories_flag}
                    onClick={handleLanguageChange}
                    type="button"
                  >
                    {language !== 'en' ? (<img
                      alt="english-lang"
                      src={enFlag}
                      style={{ width: '32px', height: 'auto' }}
                    />) : (<img
                      alt="myanmar-lang"
                      src={mmFlag}
                      style={{ width: '32px', height: 'auto' }}
                    />)}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

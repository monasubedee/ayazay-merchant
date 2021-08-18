import React, { useState, useEffect, Suspense } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Logored from '../../assets/Logo/ayazayred.png';
import bg from '../../assets/bg/announcements.png';
import styles from './register.module.scss';
import lang from '../../data/localize_data';
import { StartRegister, FullLengthRegister, RegisterSuccess, RegisterConfirm } from './components'

const Register = (props) => {
  const [route, setRoute] = useState('');

  useEffect(() => {
    const type = queryString.parse(props.location.search);
    setRoute(type.form);
  }, [props]);

  const renderRoute = (value) => {
    if (value === '1') {
      return <StartRegister />;
    } if (value === '2') {
      return <FullLengthRegister />;
    }
    if (value === '3') {
      return <RegisterConfirm />;
    }
    return <RegisterSuccess />;
  };

  return (
    <div className={styles.register_container}>
      <Suspense fallback={<div>loading</div>}>
        <div
          className={styles.register_left}
          style={{ background: `url(${bg})`, backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}
        />
      </Suspense>
      <div className={styles.register_right}>
        <div className={styles.logo}>
          <Link to="/">
            <img
              alt="logo"
              src={Logored}
            />
          </Link>
        </div>
        <div>
          {renderRoute(route)}

          <div className={styles.account}>
            {lang.ALREADY_HAVE_AN_ACCOUNT_LOGIN_HERE}
            <Link
              className={styles.account_Link}
              to="/auth/login"
            >{lang.LOGIN_HERE}</Link>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Register;

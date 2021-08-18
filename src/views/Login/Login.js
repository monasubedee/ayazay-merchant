import React, { useEffect, useState, Suspense } from 'react';
import { motion } from 'framer-motion';
import { Link, withRouter } from 'react-router-dom';
import queryString from 'query-string';
import lang from '../../data/localize_data';
import bg from '../../assets/bg/login.png';
import styles from './login.module.scss';
import PhoneLogin from './components/phonumberlogin/phonumberlogin';
import MerchantLogin from './components/merchantlogin/merchantlogin';
import VerficationLogin from './components/verficationLogin/verficationLogin';

const Login = (props) => {
  const { history } = props
  const [route, setRoute] = useState('');

  useEffect(() => {
    const type = queryString.parse(props.location.search);
    setRoute(type.type);
  }, [props]);

  const renderComponent = value => {
    if (value === 'code') {
      return <VerficationLogin />;
    }
    if (value === 'merchant') {
      return <MerchantLogin />;
    }
    return <PhoneLogin />;
  };
  const goBack = () => {
    history.goBack();
  }
  return (
    <div className={styles.login__container}>
      <div className={styles.left_side_container}>
        <div className={styles.left_side_content}>
          <div className={styles.Back_btn}>
            <div onClick={goBack}>
              <motion.button
                className={styles.click_me}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9, x: '-5px', y: '5px' }}
              >
                <i
                  className="fas fa-angle-left"
                  style={{ marginRight: '.75rem' }}
                />
                {lang.Back}
              </motion.button>
            </div>
            {renderComponent(route)}
          </div>
        </div>
        <div className={styles.footer}>
          {lang.DONT_HAVE_AN_ACCOUNT}
          <Link to="/auth/register"> {lang.Register_Here}</Link>
        </div>
      </div>
      <Suspense>
        <div
          className={styles.right_side}
          style={{
            background: `url('${bg}') no-repeat`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      </Suspense>
    </div >
  );
};
export default withRouter(Login);

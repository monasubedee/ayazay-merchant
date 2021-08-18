import React, { useState, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import lang from '../../../../data/localize_data';
import styles from './merchantlogin.module.scss';
import api from '../../../../utils/publicFetch';
import { LoadingButton as Button } from '../../../../components';
import { AuthContext } from '../../../../context/AuthContext';

const MerchantLogin = ({ history }) => {
  const auth = useContext(AuthContext);
  const [values, setValues] = useState({
    merchant_code: '',
    password: ''
  });
  const [errors, setErrors] = useState({
    merchantError: '',
    passwordError: ''
  });
  const [loading, setLoading] = useState(false);

  const { merchant_code, password } = values;

  const handleChange = event => {
    const { name, value } = event.target;
    setValues(values => ({
      ...values,
      [name]: value
    }));
  };

  const validate = () => {
    const errors = {};
    if (!merchant_code) {
      errors.merchantError = 'Merchant id is required';
    }
    if (!password) {
      errors.passwordError = 'Password is required';
    }
    return errors;
  };

  const handleClick = async event => {
    event.preventDefault();
    const data = {
      merchant_code,
      password
    };
    setErrors(validate(values));
    if (merchant_code.length === 0 || password.length === 0) {
      console.log('error')
    } else {
      try {
        setLoading(true);
        const response = await api.post('/merchant/login', data);
        console.log(response);
        if (response.status === 201) {
          const accesstoken = response.data.access_token;
          const config = {
            Method: 'GET',
            url: '/merchant',
            headers: {
              Accept: 'applicaiton/json',
              language: 'English',
              Authorization: `Bearer ${accesstoken}`,
            },
          }
          try {
            const res = await api(config);
            if (res.status === 200) {
              console.log('call', accesstoken, res.data)
              const authdata = {
                token: accesstoken,
                merchantInfo: res.data
              }
              auth.setAuthState(authdata);
              history.push('/admin/overview')
            }
          } catch (error) {
            console.log(error)
          }
          setLoading(false);
        }
      } catch (err) {
        console.log(err)
        setLoading(false);
        setErrors({
          passwordError: 'Not registerd or ID & password must be wrong'
        });
      }
    }
  };

  return (
    <div className={styles.logincomponent_container}>
      <p className={styles.login_text}>
        {lang.Login_your}
        <strong className={styles.font_bold}>{lang.AYA_ZAY}</strong>
        <br />
        {lang.merchant_account}
      </p>
      <div className={styles.input_texts}>
        <input
          className={styles.mearchant_id}
          name="merchant_code"
          onChange={handleChange}
          placeholder={lang.Merchant_ID}
          type="text"
        />
        {errors.merchantError ? (
          <small className={styles.errorMessage}>{errors.merchantError}</small>
        ) : ''}

        <input
          className={styles.merchant_password}
          name="password"
          onChange={handleChange}
          placeholder={lang.Password}
          type="password"
        />
        {errors.passwordError ? (
          <small className={styles.errorMessage}>{errors.passwordError}</small>
        ) : ''}
      </div>

      <Button
        bgcolor="#aa222a"
        color="#ffffff"
        handleClick={handleClick}
        loading={loading}
        text={lang.login}
      />

      <div className={styles.link}>
        <Link to="/auth/password">{lang.Forget_Your_Password}</Link>
        <br />
      </div>

      <div className={styles.line_through_wrap}>
        <span className={styles.line_through}>{lang.OR}</span>
      </div>
      <Link
        style={{ textDecoration: 'none' }}
        to="/auth/login"
      >
        <Button
          bgcolor="#394358"
          className={styles.phone_login}
          color="#ffffff"
          style={{ marginTop: '24px' }}
          text={lang.Log_in_with_phone_number}
        />
      </Link>
    </div>
  );
};


export default withRouter(MerchantLogin);

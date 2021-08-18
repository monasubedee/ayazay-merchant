import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import lang from '../../../../data/localize_data';
import styles from './phonumberlogin.module.scss';
import api from '../../../../utils/publicFetch';
import { MaskInput, LoadingButton as Button } from '../../../../components';
import { changeData } from 'store/action'
import { SET_MERCHANT_PH_LOGIN } from 'store/types'

const PhNumberLogin = ({ history, changeData }) => {
  const [phone, setPhone] = useState('');
  const [error, setError] = useState({
    phError: false,
    phErrorVal: null
  });
  const [loading, setLoading] = useState(false);

  const handleOperatorCheck = val => {
    setError({ phError: val });
  };

  const handlephone = val => {
    setPhone(val);
  };

  const handleClick = async e => {
    e.preventDefault();

    const Phone = `95${phone.slice(1)}`;

    const data = {
      merchant_phone_no: Phone
    };

    if (error.phError) {
      console.log('please choose dat');
    } else {
      try {
        setLoading(true);
        const response = await api.get(
          `/merchant/otprequest?phone=${data.merchant_phone_no}`
        );
        console.log(response);
        if (response.status === 200) {
          if (response.data.success) {
            changeData([SET_MERCHANT_PH_LOGIN, {
              phLogin: data.merchant_phone_no
            }])
            setLoading(false);
            history.push('/auth/login?type=code');
          } else {
            const phError = 'Service is not avaliable';
            setError({
              phError: true,
              phErrorVal: phError
            });
            setLoading(false);
          }
        }
      } catch (err) {
        setLoading(false);
        const phError = '*  Your phone number is not registered at in Merchant';
        setError({
          phError: true,
          phErrorVal: phError
        });
      }
    }
  };

  return (
    <div className={styles.container}>
      <p className={styles.login_text}>
        {lang.Please_Enter}
        <br />
        {lang.Your_Phone_Number}
        <br />
      </p>

      <div className={styles.input_texts}>
        <MaskInput
          className={
            error.phError ? styles.phone_number_active : styles.phone_number
          }
          mask="(##) ###-###-###"
          onChange={handlephone}
          onErrorCheck={val => handleOperatorCheck(val)}
          placeholder={lang.NUM}
          required
          type="number"
          value={phone}
        />
      </div>
      {error.phError ? (
        <span className={styles.errorMessage}>
          {error.phError && error.phErrorVal === undefined
            ? 'Please Retype your number'
            : phone === ''
              ? 'Phone number is required'
              : error.phErrorVal}
        </span>
      ) : null}

      <Button
        bgcolor="#aa222a"
        color="#ffffff"
        handleClick={handleClick}
        loading={loading}
        text={lang.login}
      />
      <div className={styles.OR_wrap}>
        <span className={styles.or}>{lang.OR}</span>
      </div>
      <Link
        style={{ textDecoration: 'none' }}
        to="/auth/login?type=merchant"
      >
        <Button
          bgcolor="#394358"
          color="#ffffff"
          text={lang.Sign_in_with_merchant_ID}
        />
      </Link>
    </div>
  );
};

export default withRouter(connect(null, { changeData })(PhNumberLogin));

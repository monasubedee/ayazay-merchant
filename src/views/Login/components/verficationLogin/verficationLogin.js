import React, { useState, useEffect, useContext } from 'react';
import { withRouter, Link } from 'react-router-dom';
import OtpInput from 'react-otp-input';
import { motion } from 'framer-motion';
import { connect } from 'react-redux';
import lang from '../../../../data/localize_data';
import styles from './verficationLogin.module.scss';
import api from '../../../../utils/publicFetch';
import { changeData } from 'store/action';
import { AuthContext } from '../../../../context/AuthContext';
import { LoadingButton as Button } from '../../../../components';

const VerficationLogin = ({ phone, history }) => {
  const auth = useContext(AuthContext);

  const [otp_code, setOTP] = useState();
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState({
    otpError: '',
    submiterror: false,
    ResendError: null,
  });
  const phoneslice = phone.slice(9, 12);

  const handleChange = e => {
    setOTP(e);
  };

  useEffect(() => {
    if (phone === undefined) {
      history.push('/auth/login');
    }
  }, []);

  const validate = () => {
    let otpError = '';
    if (!otp_code) {
      otpError = '*  Enter OTP';
      setOtpError({ otpError });
      return false;
    }
    return true;
  };
  const resendCode = async () => {
    try {
      const response = await api.get(`/merchant/otprequest?phone=${phone}`);
      console.log(response);
      if (response.status === 200) {
        if (response.data.statusCode === 503) {
          setOtpError({ ResendError: 'Please Try again' })
          setTimeout(() => {
            setOtpError({ ResendError: null })
          }, 1500);
        } else {
          setOtpError({ ResendError: 'Successfuly send' })
          setTimeout(() => {
            setOtpError({ ResendError: null })
          }, 1500);
        }
      }
    } catch (error) {
      setOtpError({ ResendError: 'Try again' })
      setTimeout(() => {
        setOtpError({ ResendError: null })
      }, 1500);
    }
  };
  const handleClick = async e => {
    e.preventDefault();
    const otp = parseInt(otp_code);
    const data = {
      phone,
      otp
    };
    console.log(data);
    if (validate()) {
      try {
        setLoading(true);
        const response = await api.post('/merchant/otplogin', data);
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
          history.push('/admin');
        }
      } catch (error) {
        const errorcode = '*  OTP is Wrong';
        setOtpError({
          otpError: errorcode
        });
        setLoading(false);
      }
    }
  };
  return (
    <div className={styles.VerficationLogin_container}>
      <div className={styles.verfi_text}>
        <p>
          {lang.formatString(
            lang.veriﬁcation_code,
            <strong>+959 ---- {phoneslice}</strong>,
            lang.Please_enter_the_code_in_order_to_login
          )}
        </p>
      </div>
      {otpError.otpError ? (
        <span className={styles.errorMessage}>{otpError.otpError}</span>
      ) : ''}
      <div className={styles.inputs}>
        <OtpInput
          inputStyle={{
            fontSize: '20px',
            fontWeight: '500',
            width: '100%',
            padding: '20px 10px',
            marginRight: '12px',
            border: '1px solid #cbcbcb',
            borderRadius: '8px',
            backgroundColor: '#edeff2'
          }}
          numInputs={6}
          onChange={handleChange}
          separator={<span />}
          shouldAutoFocus
          value={otp_code}
        />
      </div>
      <div>
        <Button
          bgcolor="#aa222a"
          className={styles.login_button}
          color="#ffffff"
          handleClick={handleClick}
          loading={loading}
          text={lang.Continue}
        />
      </div>

      <p className={styles.code_info_question}>
        {lang.Didnot_get_a_code}
        <strong>
          <u
            className={styles.font_bold}
            onClick={resendCode}
            style={{ cursor: 'pointer', paddingLeft: '5px' }}
          >
            {lang.Resend_code}
          </u>
        </strong>
        {otpError.ResendError === null ? '' : <p style={{ color: '#aa222a', marginTop: '5px', padding: '10px' }}>{otpError.ResendError} </p>}
      </p>

      <Link to="/auth/contact">
        <motion.button
          className={styles.contact_support}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9, x: '-5px', y: '5px' }}
        >
          {lang.Contact_Support}
        </motion.button>
      </Link>
    </div>
  );
};

const mapStateToProps = state => ({
  phone: state.merchant.login.phLogin
});


export default withRouter(
  connect(mapStateToProps, { changeData })(VerficationLogin)
);

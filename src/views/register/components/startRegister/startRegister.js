import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import lang from '../../../../data/localize_data';
import styles from './startRegister.module.scss';
import { changeData } from 'store/action';
import { FIRST_REGISTER_MERCHANT } from 'store/types'
import api from '../../../../utils/publicFetch';
import phonevalidate from 'myanmar-phonenumber'
// import Registered from '../Registered/Registered';

const StartRegister = ({ history, register, changeData }) => {

  console.log("register", register);
  const [phone, setPhone] = useState('');
  const [error, setError] = useState({
    registered: false,
    phoneError: false,
    registerError: false,

  });
  const [phonereq, setPhonereq]= useState(false)
  const [loading, setLoading] = useState(false);

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .required('This Field is required')
      .min(2, 'Too Short!')
      .max(50, 'Too Long!'),
    password: Yup.string()
      .required('This Field is required')
      .min(8, 'Password is too short - should be 8 chars minimum.')
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'It must contain at least one upper and lower characters, one numbers'),
  });

  useEffect(() => {
    if (Object.keys(register).length !== 0) {
      setPhone(register.phone);
    }
  }, [register]);

  // const handleOperatorCheck = (val) => {
  //   console.log('PHONE', val, phone);
  //   setError({ ...error, phoneError: val });
  // };
  const handlephone = (e) => {
    const phonevali=phonevalidate.isValidMMPhoneNumber(e.target.value)
    setPhone(e.target.value);
    console.log(e.target)
    if(phonevali === false && e.target.value.length > 5||phonevali === true && e.target.value.length ===10){
      setError({...error,phoneError:true})
      console.log(error)
    }else{
      setError({...error,phoneError:false})
    }
    if(e.target.value.length < 1){
      setPhonereq(true)
    }else{
      setPhonereq(false)
    }

  };
  const onhandlesubmit = async (val) => {
    const Phone = `95${phone.slice(1)}`;
    const data = {
      name: val.name.toLowerCase(),
      password: val.password,
      formatphone: Phone,
    };
    const phonedata = {
      phone: Phone,
    };

    if (!error.phoneError && phone.length>5 && data.name !== '' && data.password !== '') {
      try {
        setLoading(true);
        const response = await api.post('/merchant/check-phone', phonedata);
        console.log(response);
        if (response.status === 201) {
          changeData([FIRST_REGISTER_MERCHANT, data]);
          setLoading(false);
          history.push('/auth/register/?form=2');
        }
      } catch (e) {
        setLoading(false);
        setError({ registerError: true })
        setTimeout(() => {
          setError({ registerError: false })
        }, 1500);
        // if (message.constructor === String) {
        //   return setError({ registered: true, errormessage: message });
        // }
        // if (message.constructor === Array) {
        //   const arraymessage = message.join(',');
        //   return setError({ registered: true, errormessage: arraymessage });
        // }
      }
    } else {
      setError({ phoneError: true });
    }
  };

  return (

    <div className={styles.start_container}>
      {/* {error.registered ? (<Registered
        closeclick={closeClick}
        message="Phone number is  already registered "
      />) : null}*/}
      <div className={styles.aya_info}>{lang.Get_Started}</div>
      <p className={styles.info_text}>
        {lang.please_enter_your_name_and_password}
      </p>
      <Formik
        initialValues={{
          name: register.name,
          password: '',
        }}
        onSubmit={onhandlesubmit}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
          <Form>
            <div className={styles.shop_text}>
              <Field
                autoComplete="off"
                className={errors.name && touched.name ? styles.shop_input_active : styles.shop_input}
                name="name"
                placeholder={lang.Your_Name}
                required
                type="text"
              />
              {errors.name && touched.name
                ? (
                  <div
                    style={{
                      textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '10px', marginLeft: '5px', fontFamily: 'inherit',
                    }}
                  >
                    {errors.name}
                  </div>
                )
                : null}
            </div>
            <div className={styles.shop_text}>
              <input
                autoComplete="off"
                className={error.phoneError || phonereq ? styles.shop_input_active : styles.shop_input}
                name="phone"
                onBlur={(e) =>{if(e.target.value.length<1) setPhonereq(true)}}
                onChange={handlephone}
                placeholder={lang.NUM}
                required

                type="number"
                value={phone}
              />
              {error.phoneError ? (
                <p
                  style={{
                    textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '10px', marginLeft: '5px', fontFamily: 'inherit',
                  }}
                >
                  Please correct your phone
                </p>
              ) : ''}
              {phonereq ? (
                <p
                  style={{
                    textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '10px', marginLeft: '5px', fontFamily: 'inherit',
                  }}
                >
                  This Field is required
                </p>
              ) : ''}
              {error.registerError ? (
                <p
                  style={{
                    textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '10px', marginLeft: '5px', fontFamily: 'inherit',
                  }}
                >Your number is  already registered</p>
              ) : ''}
            </div>
            <div className={styles.shop_text}>
              <Field
                autoComplete="off"
                className={errors.password && touched.password ? styles.shop_input_active : styles.shop_input}
                name="password"
                placeholder={lang.ENTER_PASSWORD}
                required
                type="password"
              />
              {errors.password && touched.password
                ? (
                  <div
                    style={{
                      textAlign: 'center', color: 'red', fontSize: '14px', marginTop: '10px', marginLeft: '5px', fontFamily: 'inherit',
                    }}
                  >
                    {errors.password}
                  </div>
                )
                : null}
            </div>
            <div className={styles.Register_info}>
              <button
                className={styles.Register_info_button}
                type="submit"
              >
                {!loading ? (
                  <span>
                    {lang.Register}
                  </span>
                ) :
                  <span className={styles.ellipsis}>
                    <div />
                    <div />
                    <div />
                    <div />
                  </span>
                }
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};
const mapStateToProps = (state) => ({
  register: state.merchant.register
});

export default withRouter(connect(mapStateToProps, { changeData })(StartRegister));

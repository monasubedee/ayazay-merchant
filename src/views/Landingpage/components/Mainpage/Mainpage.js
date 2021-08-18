import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import home from '../home.module.css';
import Mainpage from '../../../../assets/img/main.jpg';
import group from '../../../../assets/img/group-3.jpg';
import { MaskInput } from 'components';
import Popup from '../Popup/Popup';
import { changeData } from '../../../../store/action';
import { FIRST_REGISTER_MERCHANT } from '../../../../store/types';
import api from '../../../../utils/publicFetch';
import phonevalidate from 'myanmar-phonenumber';

const MainPage = ({ changeData, lang, history }) => {
  const [error, setError] = useState(false);
  const [registerError, setRegistrError] = useState(false);
  const [phone, setPhone] = useState('');
  const [phonereq, setPhonereq] = useState(false);
  const [modal, setModal] = useState(!sessionStorage.getItem('modal'));
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(4, 'The Sentence is not long enough!')
      .max(50, 'The Sentence is too long!')
      .required('This Field is required')
  });

  const handleCreate = async val => {
    const data = {
      name: val.name
    };
    const Phone = `95${phone.slice(1)}`;
    const phonedata = {
      phone: Phone
    };
    console.log(error, data.name, phone);
    if (data.name !== '' && phone.length > 4 && !error) {
      try {
        const response = await api.post('/merchant/check-phone', phonedata);
        console.log(response);
        if (response.status === 201) {
          changeData([
            FIRST_REGISTER_MERCHANT,
            {
              name: data.name,
              phone
            }
          ]);
          history.push('/auth/register?form=1');
        }
      } catch (e) {
        setRegistrError(true);
        setTimeout(() => {
          setRegistrError(false);
        }, 1500);
      }
    } else {
      console.log('error');
      setError(true);
    }
  };
  const handlephone = e => {
    const phonevali = phonevalidate.isValidMMPhoneNumber(e.target.value);
    setPhone(e.target.value);
    console.log(e.target);
    if (
      (phonevali === false && e.target.value.length > 5) ||
      (phonevali === true && e.target.value.length === 10)
    ) {
      setError(true);
      console.log(error);
    } else {
      setError(false);
    }
    if (e.target.value.length < 1) {
      setPhonereq(true);
    } else {
      setPhonereq(false);
    }
  };

  const handleChangePopup = () => {
    sessionStorage.setItem('modal', false);
    setModal(false);
  };

  return (
    <div>
      <section
        className={home.main}
        style={{
          background: `url(${Mainpage}) no-repeat `,
          backgroundSize: 'cover'
        }}>
        <div className={home.main_container}>
          <div className={home.Login__container}>
            <div className={home.Login_wrapper}>
              <h1>{lang.Get_Started}</h1>
              <div className={home.Login_input}>
                <Formik
                  initialValues={{
                    name: ''
                  }}
                  onSubmit={handleCreate}
                  validationSchema={SignupSchema}>
                  {({ errors, touched }) => (
                    <Form>
                      <div>
                        <Field
                          autoComplete="off"
                          className={
                            errors.name && touched.name
                              ? home.input_active
                              : null
                          }
                          name="name"
                          placeholder={lang.Your_Name}
                          required
                          type="text"
                        />
                        {errors.name && touched.name ? (
                          <div
                            style={{
                              textAlign: 'center',
                              color: 'red',
                              fontSize: '14px',
                              marginTop: '10px',
                              marginLeft: '5px',
                              fontFamily: 'inherit',
                              marginBottom: '13px'
                            }}>
                            {errors.name}
                          </div>
                        ) : null}
                      </div>
                      <div>
                        <input
                          autoComplete="off"
                          className={
                            error || phonereq ? home.input_active : null
                          }
                          name="phone"
                          onBlur={e => {
                            if (e.target.value.length < 1) setPhonereq(true);
                          }}
                          onChange={handlephone}
                          placeholder={lang.NUM}
                          required
                          type="number"
                          value={phone}
                        />
                        {error ? (
                          <p
                            style={{
                              textAlign: 'center',
                              color: 'red',
                              fontSize: '14px',
                              marginTop: '10px',
                              marginLeft: '5px',
                              fontFamily: 'inherit'
                            }}>
                            Please correct your phone
                          </p>
                        ) : (
                          ''
                        )}
                        {phonereq ? (
                          <p
                            style={{
                              textAlign: 'center',
                              color: 'red',
                              fontSize: '14px',
                              marginTop: '10px',
                              marginLeft: '5px',
                              fontFamily: 'inherit'
                            }}>
                            This Field is required
                          </p>
                        ) : (
                          ''
                        )}
                        {registerError ? (
                          <p
                            style={{
                              textAlign: 'center',
                              color: 'red',
                              fontSize: '14px',
                              marginTop: '10px',
                              marginLeft: '5px',
                              fontFamily: 'inherit'
                            }}>
                            Your number is already registered
                          </p>
                        ) : (
                          ''
                        )}
                      </div>
                      <div className={home.Login_click}>
                        <button className={home.Login_account} type="submit">
                          {lang.Create_account}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
              <div className={home.Login_click}>
                <Link to="/login">
                  <button className={home.Login_phone} color="#394358">
                    {lang.Log_in_with_phone_number}
                  </button>
                </Link>
              </div>
              <div className={home.Login_terms}>
                <p>By creating account, you accept our</p>
                <Link target="_blank" to="/terms">
                  <u> Terms & Conditions. </u>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={home.learn_more}>
        <div className={home.lm_wrapper}>
          <h1 className={home.text_title}>{lang.whatisayazay}</h1>
          <div className={home.lm_container}>
            <div className={home.content_text}>
              <div className={home.text}>
                <p>{lang.Executive_para1}</p>
                <br />
                <p>{lang.Executive_para2}</p>
                <br />
                <p className={home.obj_title}>{lang.obj_title}</p>
                <ul className={home.obj_list}>
                  <li>{lang.obj_List1}</li>
                  <li>{lang.obj_List2}</li>
                  <li>{lang.obj_List3}</li>
                  <li>{lang.obj_List4}</li>
                </ul>
                <p className={home.View_title}>{lang.View_title}</p>
                <ul className={home.View_list}>
                  <li>{lang.View_List1}</li>
                  <li>{lang.View_List2}</li>
                  <li>{lang.View_List3}</li>
                </ul>
                <motion.div
                  className={home.lm_click}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9, x: '-5px', y: '5px' }}>
                  <Link to="/">Learn more</Link>
                </motion.div>
              </div>
            </div>
            <div className={home.lm_image}>
              <img alt="shopping" src={group} />
            </div>
          </div>
        </div>
      </section>

      <section>
        {!modal ? <Popup closePopup={handleChangePopup} /> : null}
      </section>
    </div>
  );
};

export default withRouter(connect(null, { changeData })(MainPage));

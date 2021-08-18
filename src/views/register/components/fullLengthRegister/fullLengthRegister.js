import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import lang from '../../../../data/localize_data';
import styles from './fullLengthRegister.module.scss';
import api from '../../../../utils/publicFetch'
import Registered from '../Registered/Registered';
import { changeData } from 'store/action';
import {NRC} from './components'
import {nricConfigs}  from 'components/utils/NRC'


const FullLengthRegister = ({ history, register, changeData }) => {
  const [error, setError] = useState({
    registered: false,
    agreeError: false,
    errormessage: '',
  });
  const [townshipArray,setTownshipArray]=useState([]);
  const [township,setTownship]=useState('');
  const [type,setType]=useState('');
  const [state,setState]=useState('');

  const [loading, setLoading] = useState(false);

  const SignupSchema = Yup.object().shape({
    company_license:  Yup.string()
      .matches(/^[0-9]+$/, 'Must must be number')
      .min('9','Must be exactly 9 characters')
      .max('9','Must be exactly 9 characters')
      .required('This Field is required'),
    email: Yup.string()
      .required('This Field is required')
      .email(),
    merchant_staff_qty: Yup.number()
      .typeError('Quantity must be a number')
      .required('This Field is required')
      .max('99999','Must not execced 5 characters')
      .positive('Quantity must be number'),
    merchant_nrc: Yup.string()
      .matches(/^[0-9]+$/, 'Must must be number')
      .min('6','Must be exactly 6 characters')
      .max('6','Must be exactly 6 characters')
      .required('This Field is required'),
    merchant_remark: Yup.string()
      .min('1','Sentence is too short')
      .max('100','Sentence is too long'),
  });

  useEffect(() => {
    if (register.formatphone === undefined || register.name === undefined || register.password === undefined) {
      history.push('/auth/register/?form=1');
    }
  }, [register, history]);

  const onHandleSubmit = async (val) => {
    console.log(val);
    const merchant=`${state}/${township}(${type})-${val.merchant_nrc}`
    console.log(merchant);
    const final = merchant.replace(/\s+/g, '');
    console.log(final);
    const data = {
      company_license: parseInt(val.company_license),
      merchant_name: register.name,
      merchant_ph_no: register.formatphone,
      merchant_nrc:final,
      merchant_staff_qty: parseInt(val.merchant_staff_qty),
      merchant_remark: val.merchant_remark,
      email: val.email,
      password: register.password,
    };

    if (val.agree === false) {
      console.log('error');
      setError({ agreeError: true });
    } else {
      try {
        setLoading(true);
        console.log(data);
        const response = await api.post('/merchant/create', data);
        console.log(response);
        if (response.status === 201) {
          setLoading(false);
          history.push('/auth/register/?form=3');
        }
      } catch (e) {
        setLoading(false);
        const { message } = e.response.data;
        let conditionmessage = message;
        let datamessage = []
        if (message.constructor === Array) {
          conditionmessage.join(',');
        }
        if (conditionmessage.includes('merchant_nrc')) {
          datamessage.push('NRC ')
        }
        if (conditionmessage.includes('company_license')) {
          datamessage.push('Company Licenese ')
        }
        if (conditionmessage.includes('email')) {
          datamessage.push('Email')
        }
        if (conditionmessage.includes('merchant_ph_no')) {
          datamessage.push('Phone Number')
        }
        console.log(datamessage)
        const showmessage = datamessage.join(',');
        setError({ registered: true, errormessage: showmessage });

      }
    }
  };
  const closeClick = () => {
    setError({ registered: false });
  };


  const handleState=(e)=>{
    setState(e.target.value)
    if( e.target.value === ''){
      setTownshipArray([])
    }else{
      setTownshipArray([...nricConfigs.NRIC.township[e.target.value]])
    }

  }

  const handletownship =(e)=>{
    console.log(e.target)
    setTownship(e.target.value)
  }
  const handletype =(e)=>{
    console.log(e.target)
    setType(e.target.value)
  }

  return (
    <div className={styles.FullLengthRegister_container}>
      {error.registered ? (<Registered
        closeclick={closeClick}
        message={error.errormessage}
        text="Your information is something wrong"
      />) : null}
      <Formik
        initialValues={{
          company_license: '',
          email: '',
          merchant_staff_qty: '',
          merchant_nrc: '',
          merchant_remark: '',
          agree: false,
        }}
        onSubmit={onHandleSubmit}
        validationSchema={SignupSchema}
      >
        {({ errors, touched }) => (
          <Form style={{ width: '100%' }}>
            <p className={styles.aya_info}>{lang.Your_Information}</p>
            <p className={styles.shop_info}>
              {lang.formatString(lang.Do_you_have_a_shop_or_online_shop, <strong className={styles.bold}>{lang.company_license}</strong>)}
            </p>
            <Field
              autoComplete="off"
              className={errors.company_license && touched.company_license ? styles.shop_input_active : styles.shop_input}
              name="company_license"
              placeholder={lang.company_license_eg}
              required
              type="text"
            />
            {errors.company_license && touched.company_license ? (
              <p
                style={{
                  color: 'red', fontSize: '14px', marginTop: '5px', marginLeft: '5px', fontFamily: 'inherit',
                }}
              >
                {errors.company_license}
              </p>
            ) : ''}
            <div>
              <p className={styles.business_info}>{lang.email}</p>
              <Field
                autoComplete="off"
                className={errors.email && touched.email ? styles.shop_input_active : styles.shop_input}
                name="email"
                placeholder={lang.enter_email}
                required
                type="text"
              />
              {errors.email && touched.email ? (
                <p
                  style={{
                    color: 'red', fontSize: '14px', marginTop: '5px', marginLeft: '5px', fontFamily: 'inherit',
                  }}
                >
                  {errors.email}
                </p>
              ) : ''}
            </div>

            <div className={styles.employees_info}>
              <p>
                {lang.formatString(lang.How_many_employees_do_you_have,
                  <strong className={styles.bold}>{lang.employees}</strong>)}
              </p>
              <div className={styles.shop_text}>
                <Field
                  autoComplete="off"
                  className={errors.merchant_staff_qty && touched.merchant_staff_qty ? styles.shop_input_active : styles.shop_input}
                  name="merchant_staff_qty"
                  placeholder={lang.Example}
                  required
                  type="text"
                />
                {errors.merchant_staff_qty && touched.merchant_staff_qty ? (
                  <p
                    style={{
                      color: 'red', fontSize: '14px', marginTop: '5px', marginLeft: '5px', fontFamily: 'inherit',
                    }}
                  >
                    {errors.merchant_staff_qty}
                  </p>
                ) : ''}
              </div>
            </div>

            <div className={styles.Product_info}>
              <div className={styles.shop_radio}>
                <p className={styles.business_info}>{lang.NRC}</p>
              </div>
              <NRC
                handleState={handleState}
                handletownship={handletownship}
                handletype={handletype}
                nricConfigs={nricConfigs}
                state={state}
                township={township}
                townshipArray={townshipArray}
              />
              <Field
                autoComplete="off"
                className={errors.merchant_nrc && touched.merchant_nrc ? styles.shop_input_active : styles.shop_input}
                name="merchant_nrc"
                placeholder="163484"
                required
                type="text"
              />
              {errors.merchant_nrc && touched.merchant_nrc ? (
                <p
                  style={{
                    color: 'red', fontSize: '14px', marginTop: '5px', marginLeft: '5px', fontFamily: 'inherit',
                  }}
                >
                  {errors.merchant_nrc}
                </p>
              ) : ''}
            </div>
            <div>
              <p className={styles.business_info}>{lang.Remark}</p>
              <Field
                autoComplete="off"
                className={errors.merchant_remark && touched.merchant_remark ? styles.textarea_active : styles.textarea}
                cols={50}
                component="textarea"
                name="merchant_remark"
                placeholder={lang.Enter_remark_here}
                rows={4}
              />
              {errors.merchant_remark && touched.merchant_remark ? (
                <p
                  style={{
                    color: 'red', fontSize: '14px', marginTop: '5px', marginLeft: '5px', fontFamily: 'inherit',
                  }}
                >
                  {errors.merchant_remark}
                </p>
              ) : ''}
            </div>
            <div className={styles.check_me}>
              <Field
                className={styles.check_terms}
                name="agree"
                style={{ marginRight: '8px' }}
                type="checkbox"
              />
              <strong className={styles.terms_conditionsr}>
                {lang.formatString(lang.By_registering_on_our_platform, <Link
                  target="_blank"
                  to="/terms"
                ><u style={{ color: '#394358' }}>{lang.Terms_Conditions}</u></Link>)}
              </strong>
              {error.agreeError ? (
                <p
                  style={{
                    color: 'red', fontSize: '14px', marginTop: '5px', marginLeft: '5px', fontFamily: 'inherit',
                  }}
                >
                  Terms & conditons must be checked
                </p>
              ) : null}
            </div>
            <div>
              <button
                className={styles.Register_button}
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

export default withRouter(connect(mapStateToProps, { changeData })(FullLengthRegister));

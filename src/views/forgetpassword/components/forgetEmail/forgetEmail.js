import React, {
  useState, useEffect, useRef,
} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styles from './forgetEmail.module.scss';
import bg from 'assets/bg/forgetPassword.png';
import api from 'utils/publicFetch';
import { changeData } from 'store/action'
import { FORGET_PASSWORD } from 'store/types'
import { useSnackbar } from 'notistack'
const emailSchema = Yup.object().shape({
  email: Yup.string()
    .email('* This email is invalid'),
});

const ForgetEmail = ({ history, changeData }) => {
  const [loading, setLoading] = useState(false);
  const inputElement = useRef(null);
  const [error, setError] = useState({
    errormeesage: false,
  });

  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (inputElement.current) {
      inputElement.current.select();
    }
  }, []);



  const onhandlesubmit = async (val) => {
    console.log('click');
    const data = {
      email: val.email,
    };
    console.log(data);
    try {
      setLoading(true);
      const response = await api.post('/merchant/reset-password', data);
      console.log(response);
      if (response.status === 201) {
        changeData([FORGET_PASSWORD, data])
        setLoading(false);
        enqueueSnackbar('Please check your Email', {
          variant: 'background-color:white',
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
        setTimeout(() => {
          history.push('/auth/password?type=updatePassword');
        }, 3500);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError({ errormeesage: true });
      setTimeout(() => {
        setError({ errormeesage: false });
      }, 1000);
    }
  };

  return (
    <div className={styles.passwordContainer}>
      <div className={styles.leftSide}>
        <div className={styles.leftMenu}>
          <div className={styles.tittle}>
            <div className={styles.backBtn}>
              <Link to="/auth/login?type=merchant">
                <button
                  className={styles.click_me}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9, x: '-5px', y: '5px' }}
                >
                  <i
                    className="fas fa-angle-left"
                    style={{ marginRight: '.75rem' }}
                  />
                Back
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.content}>
            <h1>Forgot Password?</h1>
            <p>We will send you the confirmation link to your email. Please check your email to reactivate your account.</p>
          </div>
          <div className={styles.sentLinkContainer}>
            <Formik
              initialValues={{
                email: '',
              }}
              onSubmit={onhandlesubmit}
              validationSchema={emailSchema}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    autofocus="true"
                    className={styles.sentLinkInput}
                    name="email"
                    placeholder="Enter Email"
                    required
                    type="email"
                  />
                  {errors.email && touched.email ? <div className={styles.errorMessage}>{errors.email}</div> : null}
                  {error.errormeesage ? (<div className={styles.errorMessage}> Your Email is Not Registered</div>) : null}
                  <button
                    className={styles.sentLinkBtn}
                    type="submit"
                  >
                    {!loading ? (
                      <span>
                        SENT LINK
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
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <div
        className={styles.rightSide}
        style={{ background: `url('${bg}') no-repeat`, backgroundSize: 'cover', backgroundPosition: 'center' }}
      />
    </div>
  );
};

export default withRouter(connect(null, { changeData })(ForgetEmail));

import React, { useState, useEffect } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import styles from './updatePassword.module.scss';
import api from 'utils/publicFetch';
import { useSnackbar } from 'notistack'
import { changeData } from 'store/action'
import { FORGET_PASSWORD } from 'store/types'

const passwordSchema = Yup.object().shape({
  tmp_password: Yup.string(),
  newPassword: Yup.string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character',
    ),
  confirmPasword: Yup.string()
    .when('newPassword', {
      is: (newPassword) => (!!(newPassword && newPassword.length > 0)),
      then: Yup.string().oneOf([Yup.ref('newPassword')], 'Password doesn\'t match'),
    }),
});

const UpdatePassword = ({ emailForget, history, changeData }) => {
  const [loading, setloading] = useState(false);
  const [error, setError] = useState({
    errorMessage: false,
  });
  const { enqueueSnackbar } = useSnackbar()
  useEffect(() => {
    if (emailForget.email === undefined) {
      history.push('/auth/password');
    }
  }, [emailForget]);
  const onhandlesubmit = async (val) => {
    console.log('submit', val);
    const data = {
      tmp_password: val.tmp_password,
      password: val.newPassword,
      email: emailForget.email,
    };
    console.log(data);
    try {
      setloading(true);
      const response = await api.post('/merchant/update-password', data);
      console.log(response);
      if (response.status === 201) {
        setloading(false);
        changeData([FORGET_PASSWORD, data]);
        enqueueSnackbar('Changed Successfully', {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        })
        setTimeout(() => {
          history.push('/auth/login?type=merchant');
        }, 3000);
      }
    } catch (error) {
      setloading(false);
      setError({ errorMessage: true });
      setTimeout(() => {
        setError({ errorMessage: false })
      }, 2000);
    }
  };
  return (
    <div className={styles.updateContainer}>
      <div className={styles.tittle}>
        <div className={styles.backBtn}>
          <Link to="/auth/password">
            <button className={styles.click_me}>
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
        <h1>Enter New Password</h1>
        <p>Please enter your temporary password from email and new password for your account.</p>
      </div>
      <div className={styles.sentLinkContainer}>
        <Formik
          initialValues={{
            tmp_password: '',
            newPassword: '',
            confirmPasword: '',
          }}
          onSubmit={onhandlesubmit}
          validationSchema={passwordSchema}
        >
          {({ errors, touched }) => (
            <Form>
              <Field
                autoFocus
                className={styles.sentLinkInput}
                name="tmp_password"
                placeholder="Temporary Password"
                required
                type="password"
              />
              {errors.tmp_password && touched.tmp_password ? <div className={styles.errorMessage}>{errors.tmp_password}</div> : null}

              <Field
                className={styles.sentLinkInput}
                name="newPassword"
                placeholder="New Password"
                required
                type="password"
              />
              {errors.newPassword && touched.newPassword ? <div className={styles.errorMessage}>{errors.newPassword}</div> : null}

              <Field
                className={styles.sentLinkInput}
                name="confirmPasword"
                placeholder="Confirm Password"
                required
                type="password"
              />
              {errors.confirmPasword && touched.confirmPasword ? <div className={styles.errorMessage}>{errors.confirmPasword}</div> : null}

              {error.errorMessage ? (
                <div className={styles.errorMessage}>
                  {' '}
* Tempory password is wrong
                  {' '}
                  <br />
                  {' '}
Please try again
                  {' '}
                </div>
              ) : null}
              <button
                className={styles.sentLinkBtn}
                type="submit"
              >
                {!loading ? (
                  <span>
                    UPDATE PASSWORD
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

  );
};

const mapStateToProps = (state) => ({
  emailForget: state.merchant.forgetPassword
});
export default withRouter(connect(mapStateToProps, { changeData })(UpdatePassword));

import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { Link, withRouter } from 'react-router-dom';
import styles from './issue.module.css';
import api from '../../../../utils/publicFetch';
import { MaskInput } from 'components';
import { uploadImage } from '../../../../constants/utilsAction';
import { useSnackbar } from 'notistack'

const Issue = ({ history }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState([]);
  const [showimage, setShowImage] = useState(null);

  const hiddenfileinput = React.useRef(null);

  const showsnack = (data) => {
    const message = data;
    enqueueSnackbar(message, {
      variant: 'success',
      anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right',
      },
    });
  }

  const handleOperatorCheck = (val) => {
    setError(val);
  };
  const handlephone = (val) => {
    setPhone(val);
  };
  const handleimage = (e) => {
    setShowImage(URL.createObjectURL(e.target.files[0]));
    if (e.target.files && e.target.files[0]) {
      const url = uploadImage(e.target.files[0]);
      console.log(url);
      setImage(url);
    }
  };
  const handledelete = () => {
    setImage([]);
    setShowImage(null);
  };
  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(5, 'Name is too short!')
      .max(30, 'Name is too Long!'),
    email_address: Yup.string()
      .email('Your email is not correct'),
    reason: Yup.string()
      .min(5, 'Reason is too short!')
      .max(30, 'Reason is too Long'),
    issue: Yup.string().required('A radio option is required'),
  });



  const handleSubmit = async (values) => {
    let data;
    const Phone = `95${phone.slice(1)}`;

    data = {
      name: values.name,
      email_address: values.email_address,
      phone_number: Phone,
      issue: values.issue,
      images: [image.result],
    };
    if (values.issue === 'others') {
      data = {
        name: values.name,
        email_address: values.email_address,
        phone_number: Phone,
        issue: values.reason,
        images: [image.result],
      };
    }
    try {
      setLoading(true);
      const response = await api.post('/issue-tracker', data);
      console.log(response)
      if (response.status === 201) {
        setLoading(false);
        showsnack('successfully created')
        setTimeout(() => {
          history.push('/auth/login')
        }, 1500);
      }
    } catch (e) {
      setLoading(false);
      const { message } = e.response.data;
      console.log(message);
      showsnack('Something went wrong')
    }
  };
  return (
    <div>
      <div className={styles.contantus__container}>
        <div className={styles.contentTop}>
          <div className={styles.backBtn}>
            <Link to="/auth/login?type=merchant">
              <button className={styles.clickMe}>
                <i className="fas fa-angle-left" />
                Back
              </button>
            </Link>
          </div>
          <Formik
            initialValues={{
              name: '',
              email_address: '',
              issue: '',
              reason: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={SignupSchema}
          >
            {({ values, errors, touched }) => (
              <Form className={styles.formContainer}>
                <div className={styles.column}>
                  <div className={styles.contentMiddle}>
                    <div className={styles.contentTitle}>
                      <h2>Your information</h2>
                    </div>
                    <div className={styles.inputList}>
                      <Field
                        className={!errors.name ? styles.inputItem : styles.inputItem_active}
                        name="name"
                        placeholder="Name"
                        required
                        type="text"
                      />
                      {errors.name ? (<p className={styles.errormessage}>{errors.name}</p>) : null}
                      <Field
                        className={!errors.email_address ? styles.inputItem : styles.inputItem_active}
                        name="email_address"
                        placeholder="Email Address"
                        required
                        type="text"
                      />
                      {errors.email_address ? (<p className={styles.errormessage}>{errors.email_address}</p>) : null}
                      <MaskInput
                        className={!error ? styles.inputItem : styles.inputItem_active}
                        mask="(##) ###-###-###"
                        name="phone"
                        onChange={handlephone}
                        onErrorCheck={(val) => handleOperatorCheck(val)}
                        placeholder="+95 |"
                        required
                        type="number"
                        value={phone}
                      />
                      {error ? (<p className={styles.errormessage}>Please correct your number</p>) : null}
                    </div>
                  </div>
                  <div className={styles.checkbox}>
                    <label>
                      <strong>What happened ? </strong>
                    </label>
                    <ul className={styles.checkboxList}>
                      <li>
                        <Field
                          className={styles.checkboxItem}
                          name="issue"
                          type="radio"
                          value="Can\'t login to account"
                        />
                        <span>
                          {' '}
                          Can't login to account
                        </span>
                      </li>
                      <li>
                        <Field
                          className={styles.checkboxItem}
                          name="issue"
                          type="radio"
                          value="Don\'t get OTP CODE"
                        />
                        <span> Don't get OTP code</span>
                        {' '}
                      </li>
                      <li>
                        <Field
                          className={styles.checkboxItem}
                          name="issue"
                          type="radio"
                          value="Forget Password"
                        />
                        <span> Forget Password</span>
                      </li>
                      <li>
                        <Field
                          className={styles.checkboxItem}
                          name="issue"
                          type="radio"
                          value=" Didn\'t get email confirmation"
                        />
                        <span>
                          {' '}
                  Didn't get email confirmation
                        </span>
                      </li>
                      <li>
                        <Field
                          className={styles.checkboxItem}
                          name="issue"
                          type="radio"
                          value="others"
                        />
                        <span> others</span>
                      </li>
                    </ul>
                    {touched.issue ? (<p className={styles.errormessage}>{errors.issue}</p>) : null}
                  </div>
                  <div className={styles.inputList}>
                    {values.issue === 'others' ? (
                      <Field
                        className={!errors.reason ? styles.inputItem : styles.inputItem_active}
                        name="reason"
                        placeholder="Write your reason"
                        required
                        type="text"
                      />
                    ) : null}
                    {errors.reason ? (<p className={styles.errormessage}>{errors.reason}</p>) : null}
                  </div>
                </div>
                <div className={styles.column}>
                  <div className={styles.attachItem}>
                    <div>
                      <h2>Attach Your files</h2>
                    </div>
                    <div className={styles.imageInput}>
                      <div className={styles.inputitem}>
                        {showimage === null ? (
                          <div className={styles.inputitem}>
                            <i className="fas fa-upload" />
                            <span>Please attach your files in here</span>
                            <a
                              onClick={() => { hiddenfileinput.current.click(); }}
                            >
                              attach files
                            </a>
                          </div>
                        )
                          : (
                            <div className={styles.imageicon}>
                              <p style={{ width: '100%', textAlign: 'end' }}>
                                <i
                                  className="fas fa-times"
                                  onClick={handledelete}
                                />
                              </p>
                              <img
                                alt=""
                                src={showimage}
                              />
                            </div>
                          )}
                      </div>
                      <input
                        accept=".png, .jpg, .jpeg"
                        hidden
                        onChange={handleimage}
                        ref={hiddenfileinput}
                        type="file"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.sentBtn}>
                  <button
                    className={styles.sentLink}
                    type="submit"
                  >
                    {!loading ? (
                      <span>
                        Send Message
                      </span>
                    ) : (
                        <span className={styles.ellipsis}>
                          <div />
                          <div />
                          <div />
                          <div />
                        </span>
                      )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Issue);

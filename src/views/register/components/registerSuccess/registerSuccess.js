import React from 'react';
import { Link } from 'react-router-dom';
import lang from '../../../../data/localize_data';
import styles from './registerSuccess.module.scss';

const RegisterSuccess = () => (
  <div className={styles.RegisterSuccess_container}>
    <div className={styles.RegisterSuccess_content}>
      <div className={styles.info_text}>
        <h3 className={styles.info_title}>{lang.WHO_ARE_YOU}</h3>
        <p className={styles.info_para}>
          {lang.In_order_to_ﬁnish_your_merchant_registration}
        </p>
      </div>
      <div className={styles.continue}>
        <Link to="/auth/register?form=1">
          <button
            className={styles.continue_button}
            color="#aa222a"
          >{lang.Continue_register}</button>
        </Link>
      </div>
    </div>
  </div>
);

export default RegisterSuccess;

import React from 'react';
import { Link } from 'react-router-dom';
import lang from '../../../../data/localize_data';
import styles from './registerConfirm.module.scss';

const RegisterComfirm = () => (
  <div className={styles.RegisterComfirm_container}>

    <div className={styles.verfi_text}>
      <p className={styles.code_info}>
        <strong>
          Merchant registration is successful.
          <br />
        </strong>
                    We will get back to you via
        <strong> SMS </strong>
                    and thanks for your registration.
        <br />
                  See you soon!
      </p>
    </div>
    <Link to="/">
      <button
        className={styles.comfirm}
        color="#aa222a"
      >{lang.Back_To_Home}</button>
    </Link>
  </div>
);

export default RegisterComfirm;

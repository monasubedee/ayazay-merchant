import React from 'react';
import styles from './footercontact.module.scss';
import { Link } from 'react-router-dom';


const FooterContact = () => {

  return (
    <div className={styles.FooterContact_container}>
      <div className={styles.ft_service}>
        <div className={styles.ft_text}>
          <h2>Contact Us</h2>
          <div className={styles.ft_link}>
            <Link to="/">lorem Ipsum</Link>
            <br />
            <Link to="/">Dor sit amet</Link>
            <br />
            <Link to="/">eit sed do</Link>
            <br />
            <Link to="/">conert adiaspding</Link>
          </div>
        </div >
        <div className={styles.ft_text}>
          <h2>Download App</h2>
          <div className={styles.ft_link}>
            <Link to="/">Google Playstore</Link>
            <br />
            <Link to="/">Apple Store</Link>
          </div>
        </div>
      </div>
      <div className={styles.ft_service}>
        <div className={styles.ft_text}>
          <h2>Want to buy products?</h2>
          <div className={styles.ft_link}>
            <div className={styles.ft_link_explore}><Link href="https://uat-aya-zay.com"><strong>Explore</strong></Link></div>
          </div>
        </div>
        <div className={styles.ft_text}>
          <h2>External Links</h2>
          <div className={styles.ft_link}>
            <div className={styles.ft_link_soical}>
              <Link to="/"><i className="fab fa-facebook-f" /></Link>
              <Link to="/"><i className="fab fa-instagram" /></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterContact
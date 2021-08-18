import React from 'react';
import home from '../home.module.css'
import graphic from '../../../../assets/img/19.png';
const Bussiness = () => (

  <section className={home.bm}>
    <div className={home.bm_container}>
      <h2>
        This isn’t an easy time to run a business.
        <br />
        {' '}
        But we’re here to help.
      </h2>
      <p className={home.text}>
        WHY
        <span className={home.strong}>AYA ZAY?</span>
      </p>
      <div className={home.bm_link}>
        <div className={home.bm_icon}>
          <i className="fab fa-searchengin " />
          <p className={home.bm_icon_text}>
            Customer Order
            <br />
            Tracking
          </p>
        </div>
        <div className={home.bm_icon}>
          <i className="far fa-clipboard" />
          <p className={home.bm_icon_text}>
            Online Sales
            <br />
            {' '}
            Report
          </p>
        </div>
        <div className={home.bm_icon}>
          <i className="far fa-comment-dots" />
          <p className={home.bm_icon_text}>
            Customer
            <br />
            {' '}
            Feedback
          </p>
        </div>
      </div>
      <div className={home.bm_image}>
        <img
          alt="bm_img"
          src={graphic}
          srcSet=""
        />
      </div>
    </div>
  </section>
)

export default Bussiness
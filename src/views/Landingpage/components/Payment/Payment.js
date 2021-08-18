import React from 'react';
import { Link } from 'react-router-dom';
import home from '../home.module.css'

import { useWindowWidth } from '@react-hook/window-size'
import { PaymentSlide } from './components'

const Payment = () => {

  const width = useWindowWidth()

  let paymentContent = '';
  if (width < 992) {
    paymentContent = (
      <PaymentSlide />
    );
  } else {
    paymentContent = (
      <div className={home.pm_card}>
        <div className={home.card_pm}>
          <div className={home.card_pm_text}>
            <h3>free</h3>
            <p>
              From
              <span className={home.strong}>$0</span>
              {' '}
          /mo
            </p>
          </div>
          <div className={home.card_pm_para}>
            <p>300 Post Products</p>
            <p>Receive & Response to inquires</p>
            <p>Transact on platform</p>
            <p>__</p>
            <p>__</p>
            <p>__</p>
          </div>
        </div>
        <div className={home.card_pm}>
          <div className={home.card_pm_text}>
            <h3 className={home.font_red}>standard</h3>
            <p>
              From
              <span className={home.strong}>$500</span>
              {' '}
          /mo
            </p>
          </div>
          <div className={home.card_pm_para}>
            <p>Unlimited</p>
            <p>Receive & Response to inquires</p>
            <p>Transact on platform</p>
            <p>Beta Features Accesses</p>
            <p>__</p>
            <p>
              <span className={home.font_red}>3</span>
              {' '}
          Sub Accounts
            </p>
          </div>
        </div>
        <div className={home.card_pm}>
          <div className={home.card_pm_text}>
            <h3 className={home.font_red}>premium</h3>
            <p>
              From
              <span className={home.strong}> $1000</span>
              {' '}
          /mo
            </p>

          </div>
          <div className={home.card_pm_para}>
            <p>Unlimited</p>
            <p>Receive & Response to inquires</p>
            <p>Transact on platform</p>
            <p>Beta Features Accesses</p>
            <p>Data & Reportings</p>
            <p>
              <span className={home.font_red}>5</span>
              {' '}
          Sub Accounts
            </p>
          </div>
        </div>
      </div>
    )
  }


  return (

    <section className={home.payment}>
      <div className={home.payment_container}>
        <div className={home.pm_text}>
          <p>“Prices now start at just $0/month”</p>
          <h2>
            Join more than 100,000
            <br />
          small businesses and their teams.
          </h2>
        </div>
        <button
          className={home.pm_click}
        >
          <Link to="/">Join now</Link>
        </button>
      </div>

      {paymentContent}
    </section>

  );
}

export default Payment
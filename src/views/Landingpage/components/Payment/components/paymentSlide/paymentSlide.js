import React, { useState } from 'react';
import home from '../../../home.module.css'
import styles from 'assets/scss/slide.module.scss'

const PaymentSlide = () => {
  const [selected, setselected] = useState(0);
  const [slideorder, setslideorder] = useState([]);

  const rotate = (slides) => {
    setslideorder(slides);

  };

  // rotate slides left by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [3, 4, 5, 1, 2]
  const rotateLeft = (spaces = 1) => {
    const s = slideorder.map((_, i) => slideorder[(i + spaces) % slideorder.length]);
    setselected((selected + spaces) % 3);
    rotate(s);

  };

  // rotate slides right by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [4, 5, 1, 2, 3]
  const rotateRight = (spaces = 1) => {
    const s = slideorder.reduce((result, slide, i) => {
      result[(i + spaces) % slideorder.length] = slide;
      return result;
    }, []);

    setselected(2 - ((4 - selected + spaces) % 3));
    rotate(s);
  };

  const handleDotClick = idx => {
    if (idx > selected) {
      rotateLeft(idx - selected);
    } else if (idx < selected) {
      rotateRight(selected - idx);
    }
  };


  return (
    <div className={styles.carousel_wrap}>
      <div className={styles.carousel_container}>
        <ul className={styles.carousel_container}>
          <li className={selected === 0 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
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
            </div>
          </li>
          <li className={selected === 1 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
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
            </div>
          </li>
          <li className={selected === 2 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
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
          </li>
        </ul>
      </div>
      <div className={styles.carousel_dash}>
        <button
          className={selected === 0 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(0)}
        />
        <button
          className={selected === 1 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(1)}
        />
        <button
          className={selected === 2 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(2)}
        />
      </div>
    </div>

  );
};


export default PaymentSlide
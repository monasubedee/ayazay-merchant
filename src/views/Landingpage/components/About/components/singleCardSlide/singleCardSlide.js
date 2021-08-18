import React, { useState } from 'react';
import home from '../../../home.module.css'
import oval from 'assets/img/oval.png';
import styles from 'assets/scss/slide.module.scss'

const SingleCardSlide = () => {
  const [slideselect, setslideselect] = useState(0);
  const [slidecount, setslidecount] = useState([]);

  const rotate = (slides) => {
    setslidecount(slides);
  };

  // rotate slides left by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [3, 4, 5, 1, 2]
  const rotateLeft = (spaces = 1) => {
    const s = slidecount.map((_, i) => slidecount[(i + spaces) % slidecount.length]);

    setslideselect((slideselect + spaces) % 3);
    rotate(s);
  };

  // rotate slides right by n spaces: e.g. 2 spaces - [1, 2, 3, 4, 5] -> [4, 5, 1, 2, 3]
  const rotateRight = (spaces = 1) => {
    const s = slidecount.reduce((result, slide, i) => {
      result[(i + spaces) % slidecount.length] = slide;
      return result;
    }, []);

    setslideselect(2 - ((2 - slideselect + spaces) % 3));
    rotate(s);
  };

  const handleDotClick = idx => {
    if (idx > slideselect) {
      rotateLeft(idx - slideselect);
    } else if (idx < slideselect) {
      rotateRight(slideselect - idx);
    }
  };

  return (
    <div className={styles.carousel_wrap}>
      <div className={styles.carousel_container}>

        <ul className={styles.carsousel_contaeiner}>
          <li className={slideselect === 0 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
              <div className={home.ab__card} >
                <div className={home.ab_card_card}>
                  <div className={home.ab_card_title}>
                    <div className={home.card_title_icon}>
                      <img
                        alt="#"
                        src={oval}
                        srcSet=""
                      />
                    </div>
                    <div className={home.card_title_name}>
                      <h3>Pan Feng</h3>
                      <h4>Merchant Seller</h4>
                    </div>
                  </div>
                  <div className={home.ab_card_para}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti quibusdam veritatis, eaque iste, adipisci tempora quos quod voluptatibus nesciunt repudiandae praesentium velit esse. Sint ipsa sequi ratione minus provident?</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={slideselect === 1 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
              <div className={home.ab__card} >
                <div className={home.ab_card_card}>
                  <div className={home.ab_card_title}>
                    <div className={home.card_title_icon}>
                      <img
                        alt="#"
                        src={oval}
                        srcSet=""
                      />
                    </div>
                    <div className={home.card_title_name}>
                      <h3>Pan Feng</h3>
                      <h4>Merchant Seller</h4>
                    </div>
                  </div>
                  <div className={home.ab_card_para}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti quibusdam veritatis, eaque iste, adipisci tempora quos quod voluptatibus nesciunt repudiandae praesentium velit esse. Sint ipsa sequi ratione minus provident?</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li className={slideselect === 2 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
              <div className={home.ab__card}>
                <div className={home.ab_card_card}>
                  <div className={home.ab_card_title}>
                    <div className={home.card_title_icon}>
                      <img
                        alt="#"
                        src={oval}
                        srcSet=""
                      />
                    </div>
                    <div className={home.card_title_name}>
                      <h3>Pan Feng</h3>
                      <h4>Merchant Seller</h4>
                    </div>
                  </div>
                  <div className={home.ab_card_para}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti quibusdam veritatis, eaque iste, adipisci tempora quos quod voluptatibus nesciunt repudiandae praesentium velit esse. Sint ipsa sequi ratione minus provident?</p>
                  </div>
                </div>
              </div>

            </div>
          </li>
        </ul>
      </div>
      <div className={styles.carousel_dash}>
        <button
          className={slideselect === 0 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(0)}
        />
        <button
          className={slideselect === 1 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(1)}
        />
        <button
          className={slideselect === 2 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(2)}
        />
      </div>
    </div>
  );
};


export default SingleCardSlide
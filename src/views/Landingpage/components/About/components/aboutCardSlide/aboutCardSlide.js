import React, { useState } from 'react';
import oval from 'assets/img/oval.png';
import home from '../../../home.module.css'
import styles from 'assets/scss/slide.module.scss'

const AboutCardSlide = () => {

  const [aboutselected, setaboutselected] = useState(0);
  const [aboutslideorder, setaboutslideorder] = useState([]);

  const rotate = (slides) => {
    setaboutslideorder(slides);

  };

  const rotateLeft = (spaces = 1) => {
    const s = aboutslideorder.map((_, i) => aboutslideorder[(i + spaces) % aboutslideorder.length]);

    setaboutselected((aboutselected + spaces) % 3);
    rotate(s);

  };

  const rotateRight = (spaces = 1) => {
    const s = aboutslideorder.reduce((result, slide, i) => {
      result[(i + spaces) % aboutslideorder.length] = slide;
      return result;
    }, []);

    setaboutselected(2 - ((2 - aboutselected + spaces) % 3));
    rotate(s);
  };

  return (
    <div>
      <div className={styles.carousel_wrap}>
        <div className={styles.carousel_container}>

          <ul className={styles.carousel_container}>

            <li className={aboutselected === 0 ? styles.carousel__slide_active : styles.carousel__slide}>
              <div
                className={styles.carousel__slide_item}
                onClick={() => rotateLeft()}
              >
                <div className={home.ab_card_container} >
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
                          <h3>Pan Feng </h3>
                          <h4>Merchant Seller</h4>
                        </div>
                      </div>
                      <div className={home.ab_card_para}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti quibusdam veritatis, eaque iste, adipisci tempora quos quod voluptatibus nesciunt repudiandae praesentium velit esse. Sint ipsa sequi ratione minus provident?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className={aboutselected === 1 ? styles.carousel__slide_active : styles.carousel__slide}>
              <div
                className={styles.carousel__slide_item}
                onClick={() => rotateLeft()}
              >
                <div className={home.ab_card_container} >
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
                          <h3>Pan Feng </h3>
                          <h4>Merchant Seller</h4>
                        </div>
                      </div>
                      <div className={home.ab_card_para}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti quibusdam veritatis, eaque iste, adipisci tempora quos quod voluptatibus nesciunt repudiandae praesentium velit esse. Sint ipsa sequi ratione minus provident?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <li className={aboutselected === 2 ? styles.carousel__slide_active : styles.carousel__slide}>
              <div
                className={styles.carousel__slide_item}
                onClick={() => rotateLeft()}
              >
                <div className={home.ab_card_container} >
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
                          <h3>Pan Feng </h3>
                          <h4>Merchant Seller</h4>
                        </div>
                      </div>
                      <div className={home.ab_card_para}>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis corrupti quibusdam veritatis, eaque iste, adipisci tempora quos quod voluptatibus nesciunt repudiandae praesentium velit esse. Sint ipsa sequi ratione minus provident?</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <button
          className={styles.carousel_btn__prev_btn}
          onClick={() => rotateLeft()}
        >
          <i className="fas fa-chevron-left" />
        </button>
        <button
          className={styles.carousel_btn__next_btn}
          onClick={() => rotateRight()}
        >
          <i className="fas fa-chevron-right" />
        </button>
      </div>
    </div>
  );
}

export default AboutCardSlide
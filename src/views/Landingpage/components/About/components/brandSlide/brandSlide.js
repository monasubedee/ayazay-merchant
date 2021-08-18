import React, { useState } from 'react';
import styles from 'assets/scss/slide.module.scss'
import bitmap from 'assets/bs_logo/bitmap.png';
import bitmap1 from '../../../../../../assets/bs_logo/bitmap1.png';
import bitmap2 from '../../../../../../assets/bs_logo/bitmap2.png';
import bitmap3 from '../../../../../../assets/bs_logo/bitmap3.png';
import bitmap4 from '../../../../../../assets/bs_logo/bitmap4.png';

const BrandSlide = () => {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [slideOrder, setSlideOrder] = useState([]);


  const rotate = (slides) => {
    setSlideOrder(slides);
  };


  const rotateLeft = (spaces = 1) => {
    const s = slideOrder.map((_, i) => slideOrder[(i + spaces) % slideOrder.length]);

    setSelectedIdx((selectedIdx + spaces) % 3);
    rotate(s);
  };

  const rotateRight = (spaces = 1) => {
    const s = slideOrder.reduce((result, slide, i) => {
      result[(i + spaces) % slideOrder.length] = slide;
      return result;
    }, []);

    setSelectedIdx(2 - ((2 - selectedIdx + spaces) % 3));
    rotate(s);
  };


  const handleDotClick = idx => {
    if (idx > selectedIdx) {
      rotateLeft(idx - selectedIdx);
    } else if (idx < selectedIdx) {
      rotateRight(selectedIdx - idx);
    }
  };

  return (
    <div className={styles.carousel_wrap}>
      <div
        className={styles.carousel_container}
        style={{ marginBottom: '15px' }}
      >

        <ul className={styles.carousel_container}>

          <li className={selectedIdx === 0 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
              <img
                alt="logo"
                src={bitmap}
              />
              <img
                alt="logo"
                src={bitmap1}
              />
            </div>
          </li>
          <li className={selectedIdx === 1 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
              <img
                alt="logo"
                src={bitmap2}
              />
              <img
                alt="logo"
                src={bitmap3}
              />
            </div>
          </li>
          <li className={selectedIdx === 2 ? styles.carousel__slide_active : styles.carousel__slide}>
            <div
              className={styles.carousel__slide_item}
              onClick={() => rotateLeft()}
            >
              <img
                alt="logo"
                src={bitmap4}
              />
            </div>
          </li>
        </ul>
      </div>
      <div className={styles.carousel_dash}>
        <button
          className={selectedIdx === 0 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(0)}
        />
        <button
          className={selectedIdx === 1 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(1)}
        />
        <button
          className={selectedIdx === 2 ? styles.dash_active : styles.dash}
          onClick={() => handleDotClick(2)}
        />
      </div>
    </div>
  );
};


export default BrandSlide
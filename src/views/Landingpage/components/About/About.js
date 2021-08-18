import React from 'react';
import { useWindowWidth } from '@react-hook/window-size';
import home from '../home.module.css';
import bitmap from 'assets/bs_logo/bitmap.png';
import bitmap1 from 'assets/bs_logo/bitmap1.png';
import bitmap2 from 'assets/bs_logo/bitmap2.png';
import bitmap3 from 'assets/bs_logo/bitmap3.png';
import bitmap4 from 'assets/bs_logo/bitmap4.png';
import { AboutCardSlide, BrandSlide, SingleCardSlide } from './components'

const About = () => {
  const width = useWindowWidth();

  let aboutContent = '';
  if (width < 1050) {
    aboutContent = (
      <SingleCardSlide />

    );
  } else {
    aboutContent = (
      <AboutCardSlide />
    );
  }

  let brandContent = '';
  if (width < 992) {
    brandContent = (
      <BrandSlide />

    );
  } else {
    brandContent = (
      <div className={home.ab_brand_img}>
        <img
          alt="#"
          src={bitmap}
        />
        <img
          alt="#"
          src={bitmap1}
        />
        <img
          alt="#"
          src={bitmap2}
        />
        <img
          alt="#"
          src={bitmap3}
        />
        <img
          alt="#"
          src={bitmap4}
        />
      </div>
    );
  }

  return (

    <section className={home.about}>
      <div className={home.about_container}>
        <div className={home.ab_text}>
          <p>Merchant Testimonials</p>
          <h2>What our merchants say about AYA-ZAY?</h2>
        </div>
        {aboutContent}
      </div>

      <div className={home.ab_brand}>
        <div className={home.ab_text_brand}>
          <p>Popular Brand by using AYA-ZAY</p>
          <h2>Most Successful Brand </h2>
        </div>
        {brandContent}
      </div>
    </section>
  );
};
export default About;

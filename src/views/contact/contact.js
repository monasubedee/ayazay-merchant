import React, { useState, useEffect } from 'react';
import { Navbar, Footer } from '../Landingpage/components'
import { Issue } from './components';
import lang from '../../data/localize_data';

const ContactUs = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
  }, [language]);

  const onHandleChange = (val) => {
    console.log('CLICK', val);
    lang.setLanguage(val);
    setLanguage(val);
  };
  return (
    <div>
      <Navbar
        changeLang={onHandleChange}
        lang={lang}
        language={language}
      />
      <Issue />
      <Footer />
    </div>
  );
};
export default ContactUs;

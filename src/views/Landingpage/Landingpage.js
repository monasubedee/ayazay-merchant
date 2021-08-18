import React, { Suspense, useState, useEffect } from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import lang from '../../data/localize_data';
import Popup from './components/Popup/Popup';
import { Navbar, Mainpage, About, Bussiness, Payment, Footer } from './components'

// const MainNavbar = lazy(() => Navbar)
// // const Mainpage = lazy(() => import('../../components/home/main/main'))
// // const About = lazy(() => import('../../components/home/about/about'))
// // const Footer = lazy(() => import('../../components/home/footer/footer'))
// // const Bussiness = lazy(() => import('../../components/home/bussiness/bussiness'))
// // const Payment = lazy(() => import('../../components/home/payment/payment'))



const Home = () => {
  const [language, setLanguage] = useState('en');
  const [modal, setModal] = useState();

  useEffect(() => {

    if (localStorage.getItem('modalPop') === null) {
      localStorage.setItem('modalPop', true);
      setModal(true);
    } else if (localStorage.getItem('modalPop') === true) {
      setModal(false);
    }
  }, [language]);


  const onHandleChange = (val) => {
    lang.setLanguage(val);
    setLanguage(val);
  }

  const onHandleClosePopup = () => {
    setModal(false);
  }

  return (
    <Suspense
      fallback={<div
        style={{
          position: 'fixed',
          top: '45%',
          display: 'flex',
          width: '100vw',
          justifyContent: 'center',
          transform: 'translate(-50 %, -50 %)',
        }}
      >
        <ClipLoader
          color={'#aa222a'}
          loading
          size={100}
        />
      </div>}
    >
      {modal === true ?
        <Popup closePopup={onHandleClosePopup}></Popup> :
        null

      }
      <Suspense>
        <Navbar
          changeLang={onHandleChange}
          lang={lang}
          language={language}
        />
      </Suspense>
      <Suspense fallback={<div>loading</div>}>
        <Mainpage
          lang={lang}
          language={language}
        />
      </Suspense>
      <Suspense>
        <Bussiness />
      </Suspense>
      <Suspense>
        <Payment />
      </Suspense>
      <Suspense>
        <About />
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>

    </Suspense>
  );
};

export default Home;

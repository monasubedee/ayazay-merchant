import React from 'react';
import { Link } from 'react-router-dom';
import home from '../home.module.css';
import { FooterContact, FooterDropdown } from './components'
import { useWindowWidth } from '@react-hook/window-size'

const footeritem = {
  items: [

    {
      id: 'footer',
      title: 'Why AYA-ZAY',
      children: [
        {
          id: 'urlLink',
          content_title: 'For Small Businesses',
          value: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos sint officii',
          url: '/'
        },
        {
          id: 'urlLink',
          content_title: 'For Large Businesses',
          value: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos sint officii',
          url: '/'
        },
      ],
    },

    {
      id: 'footer',
      title: 'Our Features',
      children: [
        {
          id: 'urlLink',
          content_title: '',
          value: 'Payment System',
          url: '/'
        },
        {
          id: 'urlLink',
          value: 'lorem Ipsum',
          url: '/'
        },
        {

          id: 'urlLink',
          value: 'Dor sit amet',
        },
        {

          id: 'urlLink',
          value: 'venino aqsd nod',
          url: '/'
        },

      ],
    },

    {
      id: 'footer',
      title: 'Our Services',
      children: [
        {
          id: 'urlLink',
          value: 'Payment System',
          url: '/'
        },
        {
          id: 'urlLink',
          value: 'lorem Ipsum',
          url: '/'
        },
        {

          id: 'urlLink',
          value: 'Dor sit amet',
        },
        {

          id: 'urlLink',
          value: 'venino aqsd nod',
          url: '/'
        },

      ],
    },

    {
      id: 'footer',
      title: 'Resources',
      children: [
        {
          id: 'urlLink',
          value: 'Payment System',
          url: '/'
        },
        {
          id: 'urlLink',
          value: 'lorem Ipsum',
          url: '/'
        },
        {

          id: 'urlLink',
          value: 'Dor sit amet',
        },
        {

          id: 'urlLink',
          value: 'venino aqsd nod',
          url: '/'
        },

      ],
    },

  ]
}


const Footer = () => {
  const width = useWindowWidth()

  let mainContent = '';
  if (width < 992) {
    mainContent = (
      <section className={home.footer}>
        <div className={home.footer_container}>
          {footeritem.items.map((item, index) => {
            return <FooterDropdown
              items={item}
              key={index}
            />
          })}
          <FooterContact />
        </div>
      </section>
    );
  } else {
    mainContent = (
      <section className={home.footer}>
        <div className={home.footer_container}>
          <div className={home.ft_service}>
            <div className={home.ft_aya_bussiness}>
              <h2>Why AYA-ZAY</h2>
              <div>
                <h2>For Small Businesses</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos sint officii</p>
              </div>
              <div>
                <h2>For Large Businesses</h2>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos sint officii</p>
              </div>
            </div>
            <div className={home.ft_text}>
              <h2>Our Featuers</h2>
              <div className={home.ft_link}>
                <Link to="/">lorem Ipsum</Link>
                <br />
                <Link to="/">Dor sit amet</Link>
                <br />
                <Link to="/">eit sed do</Link>
                <br />
                <Link to="/">venino aqsd nod</Link>
                <br />
                <Link to="/">Exterion ullamco asd</Link>
              </div>
            </div>
            <div className={home.ft_text}>
              <h2>Our Services</h2>
              <div className={home.ft_link}>
                <Link to="/">Payment System</Link>
                <br />
                <Link to="/">lorem Ipsum</Link>
                <br />
                <Link to="/">Dor sit amet</Link>
                <br />
                <Link to="/">eit sed do</Link>
                <br />
                <Link to="/">venino aqsd nod</Link>
                <br />

              </div>
            </div>
            <div className={home.ft_text}>
              <h2>Resources</h2>
              <div className={home.ft_link}>
                <Link to="/">Became a Merchant</Link>
                <br />
                <Link to="/">lorem Ipsum</Link>
                <br />
                <Link to="/">Dor sit amet</Link>
                <br />
                <Link to="/">eit sed do</Link>
              </div>
            </div>
          </div>
          <div className={home.ft_service}>
            <div className={home.ft_text}>
              <h2>Contact Us</h2>
              <div className={home.ft_link}>
                <Link to="/">lorem Ipsum</Link>
                <br />
                <Link to="/">Dor sit amet</Link>
                <br />
                <Link to="/">eit sed do</Link>
                <br />
                <Link to="/">conert adiaspding</Link>

              </div>
            </div>
            <div className={home.ft_text}>
              <h2>Download App</h2>
              <div className={home.ft_link}>
                <Link to="/">Google Playstore</Link>
                <br />
                <Link to="/">Apple Store</Link>
              </div>
            </div>
            <div className={home.ft_text}>
              <h2>Want to buy products?</h2>
              <div className={home.ft_link}>
                <div className={home.ft_link_explore}><a href="//uat-aya-zay.com">Explore</a></div>
              </div>
            </div>
            <div className={home.ft_text}>
              <h2>External Links</h2>
              <div className={home.ft_link}>
                <div className={home.ft_link_soical}>
                  <Link to="/"><i className="fab fa-facebook-f" /></Link>
                  <Link to="/"><i className="fab fa-instagram" /></Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    )
  }

  return (

    <div>
      {mainContent}
    </div>
  )

}

export default Footer
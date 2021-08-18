import React, { useState } from 'react'
import styles from './footerdropdown.module.scss'
import { Link } from 'react-router-dom'
const FooterDropdown = (props) => {

  const { title, children } = props.items

  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div>
      <div className={styles.dd_wrapper}>
        <div
          className={styles.dd_header}
          onClick={() => toggle(!open)}
          onKeyPress={() => toggle(!open)}
          role="button"
          tabIndex={0}
        >
          <div className={styles.dd_header__title}>
            <p className={styles.dd_header__title_bold}>{title}</p>
          </div>
          <div className={styles.dd_header__action}>

            <p >{open ? <i className="fas fa-chevron-up" /> : <i className="fas fa-chevron-down" />}</p>
          </div>
        </div>
        {open && (
          <div className={styles.dd_list}>
            {children.map((item, index) => (
              <div
                className={styles.dd_list_item}
                key={index}
              >
                <div className={styles.dd_list_container}>
                  <Link
                    className={styles.dd_list_Link}
                    to={item.url}
                  >
                    <h4>{item.content_title}</h4>
                    <p className={styles.dd_list_value}>{item.value}</p>
                  </Link>
                </div>
              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  )
}


export default FooterDropdown
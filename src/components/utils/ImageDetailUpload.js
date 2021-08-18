import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageDetailUpload.module.scss';

const ImageDetailUpload = ({
 shopUrl
}) => {
 const inputPreview = useRef(null);

 return (
  <div className={styles.avatar_upload}>
   <div className={styles.avatar_preview}>
    <div ref={inputPreview} style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}${shopUrl})` }} />
   </div>
  </div>
 );
};

ImageDetailUpload.propTypes = {
 shopUrl: PropTypes.string.isRequired,
 uploadImage: PropTypes.func.isRequired,
};

export default ImageDetailUpload;

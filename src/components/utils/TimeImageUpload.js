import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageUpload.module.scss';
import { uploadImage as getImageUrl } from '../../store/action';


const TimeImageUpload = ({
 shopUrl, imageError, uploadImage, disabled, display, imgLoading
}) => {
 const inputPreview = useRef(null);

 const imageUpload = async (e) => {

  if (e.target.files[0] !== undefined) {

   let fileExtension = e.target.files[0].type.split('/').pop();
   let textFileName = fileExtension.toLowerCase();

   if (e.target.files[0].size > 250000) {
    imageError(`Your files (${e.target.files[0].size})size  is greater than 2MB.`)
    // alert(`File is too big!\nMaximum file size is 250000\nYour file size is ${e.target.files[0].size} `);
   }

   else if (textFileName !== 'png' && textFileName !== "jpeg" && textFileName !== "jpg") {
    imageError(`Your files (${textFileName}) type is wrong.`)
    // alert(`File Type is wrong!\nOnly accept (.jpg),(.png) and (.jpeg) files type.\nYour file type is ${textFileName} `)
   }

   else {
    imgLoading(true);
    imageError("");
    if (e.target.files && e.target.files[0]) {
     const reader = new FileReader();
     reader.onload = (e) => {
      inputPreview.current.style.backgroundImage = `url(${e.target.result})`;
     };
     reader.readAsDataURL(e.target.files[0]);
    }
    const url = await getImageUrl(e.target.files[0]);
    uploadImage(url);
   }
  }
 };

 return (
  <div className={styles.avatar_upload}>
   <div className={styles.avatar_edit} style={{ display: `${display}` }}>
    <input type="file" id="timeUpload" accept=".jpg,.png,.jpeg" disabled={disabled} onChange={(e) => imageUpload(e)} />
    <label htmlFor="timeUpload" name="timeUpload" />
   </div>
   <div className={styles.avatar_preview}>
    <div ref={inputPreview} style={{ backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}${shopUrl})` }} />
   </div>
  </div>
 );
};

TimeImageUpload.propTypes = {
 shopUrl: PropTypes.string.isRequired,
 uploadImage: PropTypes.func.isRequired,
};

export default TimeImageUpload;

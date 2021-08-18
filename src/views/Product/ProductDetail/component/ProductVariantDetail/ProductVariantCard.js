import React from 'react';
import { Card, CardActionArea, CardMedia, Typography, CardContent } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect } from 'react';

const useStyles = makeStyles(() => ({

 root: {

  marginTop: '20px',
  marginRight: '5px',
  maxWidth: 400,
  minHeight: 300,
 },

 buttonActions: {
  marginRight: '10px',
 },
 media: {
  height: 200,
  backgroundSize: '100 % 100 %'
 },
 img: {
  width: '80%',
  height: '80%',
  maxHeight: 220,
  minHeight: 230,
  margin: 'auto auto',
  padding: 3,
 }


}))

const ProjectVariantCard = ({ proInfo, proImage }) => {
 const classes = useStyles();

 return (

  <Card className={classes.root}>
   <CardActionArea>
    <CardMedia
     alt="Contemplative Reptile"
     className={classes.media, classes.img}
     component="img"
     image={`${process.env.REACT_APP_IMAGE_URL}${proImage.image_url}`}
     onError={(e) => { e.target.onerror = null; e.target.src = 'https://d3dus5w7ig92hw.cloudfront.net/aya-zay/merchant/9944aaf9-13ec-4694-9794-d9a3c678b441.jpeg' }}
     title="Contemplative Reptile"
    />
    <CardContent>
     <Typography
      component="h2"
      gutterBottom
      variant="h5"
     >COLOR <span style={{ marginLeft: '32px' }}>:</span> {proInfo.color.length > 0 ? proInfo.color : ' Not found.'}</Typography>
     <Typography
      component="h2"
      gutterBottom
      variant="h5"
     >PRICE <span style={{ marginLeft: '40px' }}>:</span> {`${proInfo.price} ks`}</Typography>
     <Typography
      component="h2"
      gutterBottom
      variant="h5"
     >SIZE <span style={{ marginLeft: '53px' }}>:</span> {proInfo.size.length > 0 ? proInfo.size : ' Not found.'}</Typography>
     <Typography
      component="h2"
      gutterBottom
      variant="h5"
     >QUANTITY <span style={{ marginLeft: '8px' }}>:</span> {proInfo.qty}</Typography>
    </CardContent>
   </CardActionArea>
  </Card >


 )

}

export default ProjectVariantCard;

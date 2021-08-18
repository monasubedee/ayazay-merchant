import React from 'react';
import { Card, CardActionArea, CardMedia, Typography, CardActions, Button, CardContent } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/styles';
import { purple, indigo } from '@material-ui/core/colors';

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

const ProjectCard = ({ shopName, img, id }) => {
  const classes = useStyles();

  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(purple[500]),
      backgroundColor: indigo[500],
      '&:hover': {
        backgroundColor: indigo[500],
        textDecoration: 'underline',
        textDecorationColor: indigo[500]
      },

      textDecoration: 'underline',
      textDecorationColor: indigo[500]
    },
  }))(Button);

  return (

    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          alt="Contemplative Reptile"
          className={classes.media, classes.img}
          component="img"
          image={`${process.env.REACT_APP_IMAGE_URL}${img}`}
          onError={(e) => { e.target.onerror = null; e.target.src = 'https://d3dus5w7ig92hw.cloudfront.net/aya-zay/merchant/9944aaf9-13ec-4694-9794-d9a3c678b441.jpeg' }}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography
            component="h2"
            gutterBottom
            variant="h5"
          > {shopName} </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.buttonActions}>
        <a href={`/admin/shops/detail/${id}`}>
          <ColorButton
            color="primary"
            size="small"
            style={{ display: 'flex' }}
            variant="contained"
          > Detail</ColorButton>
        </a>
        <a href={`/admin/shops/edit/${id}`}>
          <ColorButton
            color="primary"
            size="small"
            style={{ display: 'flex' }}
            variant="contained"
          > Edit </ColorButton>
        </a>

      </CardActions>
    </Card>

  )

}

export default ProjectCard;

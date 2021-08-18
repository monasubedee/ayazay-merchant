import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  colors
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  },
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  },
  commingSoon: {

    color: 'red',
    textAlign: 'center',
    alignItems: 'center',
    fontSize: '30px',
    marginTop: '15rem'

  }
}));

const Notifications = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <div >
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <img alt="ayalogo" src="/images/ayazay/ayazaylogo.png"></img>
      </div>
      <h1 style={{ textAlign: 'center' }}>COMMING SOON</h1>
    </div>

    // <Card
    //   {...rest}
    //   className={clsx(classes.root, className)}
    // >
    //   <p style={{ color: 'red', textAlign: 'center', fontSize: '20px' }}>COMMING SOON</p>
    //   <CardHeader title="Notifications" />
    //   <Divider />
    //   <CardContent>
    //     <form>
    //       <Grid
    //         container
    //         spacing={6}
    //         wrap="wrap"
    //       >
    //         <Grid
    //           className={classes.item}
    //           item
    //           md={4}
    //           sm={6}
    //           xs={12}
    //         >
    //           <Typography
    //             gutterBottom
    //             variant="h6"
    //           >
    //             System
    //           </Typography>
    //           <Typography
    //             gutterBottom
    //             variant="body2"
    //           >
    //             You will recieve emails in your business email address
    //           </Typography>
    //           <FormControlLabel
    //             control={
    //               <Checkbox
    //                 color="primary"
    //                 defaultChecked //
    //               />
    //             }
    //             label="Email alerts"
    //           />
    //           <FormControlLabel
    //             control={<Checkbox color="primary" />}
    //             label="Push Notifications"
    //           />
    //           <FormControlLabel
    //             control={
    //               <Checkbox
    //                 color="primary"
    //                 defaultChecked //
    //               />
    //             }
    //             label="Text message"
    //           />
    //           <FormControlLabel
    //             control={
    //               <Checkbox
    //                 color="primary"
    //                 defaultChecked //
    //               />
    //             }
    //             label={
    //               <Fragment>
    //                 <Typography variant="body1">Phone calls</Typography>
    //                 <Typography variant="caption">
    //                   Short voice phone updating you
    //                 </Typography>
    //               </Fragment>
    //             }
    //           />
    //         </Grid>
    //         <Grid
    //           className={classes.item}
    //           item
    //           md={4}
    //           sm={6}
    //           xs={12}
    //         >
    //           <Typography
    //             gutterBottom
    //             variant="h6"
    //           >
    //             Chat App
    //           </Typography>
    //           <Typography
    //             gutterBottom
    //             variant="body2"
    //           >
    //             You will recieve emails in your business email address
    //           </Typography>
    //           <FormControlLabel
    //             control={
    //               <Checkbox
    //                 color="primary"
    //                 defaultChecked //
    //               />
    //             }
    //             label="Email"
    //           />
    //           <FormControlLabel
    //             control={
    //               <Checkbox
    //                 color="primary"
    //                 defaultChecked //
    //               />
    //             }
    //             label="Push notifications"
    //           />
    //         </Grid>
    //       </Grid>
    //     </form>
    //   </CardContent>
    //   <Divider />
    //   <CardActions>
    //     <Button
    //       className={classes.saveButton}
    //       variant="contained"
    //       disabled={true}
    //     >
    //       Save changes
    //     </Button>
    //   </CardActions>
    // </Card>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;

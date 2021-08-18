import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  colors
} from '@material-ui/core';

import SuccessSnackbar from '../SuccessSnackbar';

const useStyles = makeStyles(theme => ({
  root: {},
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const ProfileSettings = props => {
  const { profile, className, ...rest } = props;

  let dateFormat = profile.updated_at.replace(/T/g, " ");
  const date = dateFormat.replace(/.000Z/, " ");

  const classes = useStyles();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [values, setValues] = useState({
    merchant_name: "",
    merchant_code: "",
    merchant_nrc: "",
    merchant_ph_no: "",
    merchant_remark: "",
    merchant_staff_qty: "",
    merchant_status: "",
    company_license: "",
    updated_at: "",
    email: "",

  });

  useEffect(() => {
    setValues({
      merchant_name: profile.merchant_name,
      merchant_code: profile.merchant_code,
      merchant_nrc: profile.merchant_nrc,
      merchant_ph_no: profile.merchant_ph_no,
      merchant_remark: profile.merchant_remark,
      merchant_staff_qty: profile.merchant_staff_qty,
      merchant_status: profile.merchant_status,
      company_license: profile.company_license,
      updated_at: date,
      email: profile.email,
    })
  }, [profile])

  const handleSubmit = event => {
    event.preventDefault();
    setOpenSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form onSubmit={handleSubmit}>
        <CardHeader title="Profile" />
        <Divider />
        <CardContent>
          <Grid
            container
            spacing={4}
          >
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Name"
                name="merchant_name"
                required
                value={values.merchant_name}
                variant="outlined"
                disabled={true}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Phone number"
                name="merchant_ph_no"
                required
                value={values.merchant_ph_no}
                variant="outlined"
                disabled={true}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Email"
                name="email"
                required
                value={values.email}
                variant="outlined"
                disabled={true}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Merchant nrc"
                name="merchant_nrc"
                type="text"
                value={values.merchant_nrc}
                variant="outlined"
                disabled={true}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Merchant staff quantity"
                name="merchant_staff_qty"
                type="text"
                value={values.merchant_staff_qty}
                variant="outlined"
                disabled={true}
              >
              </TextField>
            </Grid>

            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Merchant code"
                name="merchant_code"
                type="text"
                value={values.merchant_code}
                variant="outlined"
                disabled={true}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Company license"
                name="company_license"
                required
                value={values.company_license}
                variant="outlined"
                disabled={true}
              />
            </Grid>


            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="Merchant status"
                name="merchant_status"
                type="text"
                value={values.merchant_status}
                variant="outlined"
                disabled={true}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <TextField
                fullWidth
                label="updated date"
                name="updated_at"
                type="text"
                value={values.updated_at}
                variant="outlined"
                disabled={true}
              >
              </TextField>
            </Grid>

            {/* <Grid
              item
              md={6}
              xs={12}
            >
              <Typography variant="h6">Make Contact Info Public</Typography>
              <Typography variant="body2">
                Means that anyone viewing your profile will be able to see your
                contacts details
              </Typography>
              <Switch
                checked={values.isPublic}
                color="secondary"
                edge="start"
                name="isPublic"
                onChange={handleChange}
              />
            </Grid>
            <Grid
              item
              md={6}
              xs={12}
            >
              <Typography variant="h6">Available to hire</Typography>
              <Typography variant="body2">
                Toggling this will let your teamates know that you are available
                for acquireing new projects
              </Typography>
              <Switch
                checked={values.canHire}
                color="secondary"
                edge="start"
                name="canHire"
                onChange={handleChange}
              />
            </Grid> */}
          </Grid>
        </CardContent>
        <Divider />
        {/* <CardActions>
          <Button
            className={classes.saveButton}
            type="submit"
            variant="contained"
          >
            Save Changes
          </Button>
        </CardActions> */}
      </form>
      <SuccessSnackbar
        onClose={handleSnackbarClose}
        open={openSnackbar}
      />
    </Card>
  );
};

ProfileSettings.propTypes = {
  className: PropTypes.string,
  profile: PropTypes.object.isRequired
};

export default ProfileSettings;

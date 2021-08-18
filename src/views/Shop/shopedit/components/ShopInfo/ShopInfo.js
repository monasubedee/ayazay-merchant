import React from 'react';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField,
  colors,
  Button,
  Select,
  MenuItem,
  CircularProgress
} from '@material-ui/core';
import { indigo, purple } from '@material-ui/core/colors';

const ColorButton = withStyles((theme) => ({
  root: {
    marginTop: '10px',
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

const useStyles = makeStyles(theme => ({
  root: {

    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
  saveButton: {
    color: theme.palette.white,
    backgroundColor: colors.green[600],
    '&:hover': {
      backgroundColor: colors.green[900]
    }
  }
}));

const ShopInfo = props => {
  const { id, shopInfo, categories, disable, loading, handlerChange, shopEdit, className, ...rest } = props;
  const classes = useStyles();


  const asteriokRed = (name) => {
    return <span>{name} <span style={{ color: 'red' }}>*</span></span>
  }


  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardHeader title="Shop Edit" />
      <Divider />
      <CardContent>
        <Grid
          container
          spacing={4}
        >
          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              label={asteriokRed('Name')}
              name="name"
              onChange={handlerChange}
              value={shopInfo.name}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.nameError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              label={asteriokRed('Phone number')}
              name="phone_number"
              onChange={handlerChange}
              value={shopInfo.phone_number}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.phone_numberError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              label={asteriokRed('Email')}
              name="email"
              onChange={handlerChange}
              value={shopInfo.email}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.emailError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              rows={2}
              multiline
              label={asteriokRed('Address')}
              name="address"
              onChange={handlerChange}
              type="text"
              value={shopInfo.address}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.addressError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              label="Website url"
              name="website_url"
              onChange={handlerChange}
              type="text"
              value={shopInfo.website_url}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.website_urlError}</div>
          </Grid>

          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              label="Facebook Url"
              name="facebook_url"
              onChange={handlerChange}
              type="text"
              value={shopInfo.facebook_url}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.facebook_urlError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              label="Custom Url"
              name="custom_url"
              onChange={handlerChange}
              value={shopInfo.custom_url}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.custom_urlError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <Select fullWidth
              labelId="gen_label"
              id="gen_select"
              name="gen_category_id"
              variant="outlined"
              value={shopInfo.gen_category_id}
              onChange={handlerChange}
            >
              <MenuItem value={0}>{asteriokRed('Select Category')}</MenuItem>

              {categories.length > 0
                ? categories.map(b => (
                  <MenuItem
                    key={b.id}
                    value={b.id}
                  >{b.name_english}</MenuItem>
                ))
                : null}
            </Select>
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.gen_category_idError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <Select
              fullWidth
              labelId="type_label"
              id="type_select"
              name="type"
              variant="outlined"
              value={shopInfo.type}
              onChange={handlerChange}
              style={{ marginTop: '5px' }}

            >
              <MenuItem value={"Select Type"}>{asteriokRed('Select Type')}</MenuItem>
              <MenuItem value={"ONLINE"}>ONLINE</MenuItem>
              <MenuItem value={"OFFLINE"}>OFFLINE</MenuItem>
            </Select>
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.typeError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            <TextField
              fullWidth
              label={asteriokRed('Description')}
              name="description"
              rows={8}
              multiline
              onChange={handlerChange}
              type="text"
              value={shopInfo.description}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{shopInfo.descriptionError}</div>
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >
            {
              loading === true ? <CircularProgress /> :
                <ColorButton
                  variant="contained"
                  color="primary"
                  disabled={disable}
                  onClick={(e) => shopEdit(e)}>Submit</ColorButton>
            }
          </Grid>
          <Grid
            item
            md={5}
            xs={12}
          >

            <ColorButton style={{ textDecoration: 'none' }} disabled={disable ? false : true} color="primary" variant="contained">
              <a href={`/admin/shops/list`} style={{ textDecoration: 'none', color: 'white' }}>
                View List
                 </a>
            </ColorButton>

            <ColorButton style={{ textDecoration: 'none', marginLeft: '10px' }} disabled={disable ? false : true} color="primary" variant="contained">
              <a href={`/admin/shops/detail/${id}`} style={{ textDecoration: 'none', color: 'white' }}>
                Detail
                 </a>
            </ColorButton>

          </Grid>
        </Grid>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default ShopInfo;




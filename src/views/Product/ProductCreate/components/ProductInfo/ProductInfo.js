import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Divider,
  TextField
} from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const useStyles = makeStyles(theme => ({
  root: {},
  deliverables: {
    marginTop: theme.spacing(3)
  },
  members: {
    marginTop: theme.spacing(3)
  }
}));

const ProductInfo = ({
  brands,
  categories,
  subcategories,
  className,
  shops,
  onChange,
  info,
  errors,
  ...rest
}) => {
  const classes = useStyles();
  const [values, setValues] = useState(info);

  const handleChange = event => {
    event.persist();
    const name = event.target.name;
    const value = event.target.value;
    setValues({
      ...values,
      [name]: value
    });

    onChange(name, value);
  };

  const asteriokRed = (name) => {
    return <span>{name} <span style={{ color: 'red' }}>*</span></span>
  }


  return (
    <Grid
      {...rest}
      className={clsx(classes.root, className)}
      container
      spacing={3}
    >
      <Grid
        item
        lg={12}
        md={12}
        xl={12}
        xs={12}
      >
        <Card
          {...rest}
          className={clsx(classes.root, className)}
        >
          <CardHeader title="Product Info" />
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
                  label={asteriokRed('Product Name(MM)')}
                  name="name_myanmar"
                  onChange={handleChange}
                  value={values.name_myanmar}
                  variant="outlined"
                />
                <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{errors.name_myanmarError}</div>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <TextField
                  fullWidth
                  label={asteriokRed('Product Name(EN)')}
                  name="name_english"
                  onChange={handleChange}
                  value={values.name_english}
                  variant="outlined"
                />
                <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{errors.name_englishError}</div>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormControl
                  className={classes.formControl}
                  fullWidth
                  variant="outlined"

                >
                  <InputLabel
                    error={errors.brand_idError}
                    id="demo-simple-select-outlined-label"
                  >
                    Product Brand
                  </InputLabel>
                  <Select
                    error={errors.brand_idError}
                    id="demo-simple-select-outlined"
                    label={asteriokRed('Product Brand')}
                    labelId="demo-simple-select-outlined-label"
                    name="brand_id"
                    onChange={handleChange}
                    value={values.brand_id}
                  >
                    <MenuItem value="0">
                      <em>{asteriokRed('SELECT BRAND')}</em>
                    </MenuItem>
                    {brands.length > 0
                      ? brands.map(b => (
                        <MenuItem
                          key={b.id}
                          value={b.id}
                        >{b.name}</MenuItem>
                      ))
                      : null}
                  </Select>
                  <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{errors.brand_idError}</div>
                </FormControl>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormControl
                  className={classes.formControl}
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel
                    id="demo-simple-select-outlined-label"
                  >
                    Shop
                  </InputLabel>
                  <Select
                    id="demo-simple-select-outlined"
                    label='Shop'
                    labelId="demo-simple-select-outlined-label"
                    name="shop_id"
                    onChange={handleChange}
                    value={values.shop_id}
                  >
                    <MenuItem
                      value="0"
                    >
                      <em > {asteriokRed('SELECT SHOP')}</em>
                    </MenuItem>
                    {shops.length > 0
                      ? shops.map(b => (
                        <MenuItem
                          key={b.id}
                          value={b.id}
                        >{b.name}</MenuItem>
                      ))
                      : null}
                  </Select>
                  <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{errors.shop_idError}</div>
                </FormControl>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormControl
                  className={classes.formControl}
                  fullWidth

                  variant="outlined"
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Category
                  </InputLabel>
                  <Select
                    id="demo-simple-select-outlined"
                    label='Category'
                    labelId="demo-simple-select-outlined-label"
                    name="category_id"
                    onChange={handleChange}
                    value={values.category_id}
                  >
                    <MenuItem value="0">
                      <em>{asteriokRed('SELECT CATEGORY')}</em>
                    </MenuItem>
                    {categories.length > 0
                      ? categories.map(b => (
                        <MenuItem
                          key={b.id}
                          value={b.id}
                        >{b.name_english}</MenuItem>
                      ))
                      : null}
                  </Select>
                  <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{errors.category_idError}</div>
                </FormControl>
              </Grid>
              <Grid
                item
                md={6}
                xs={12}
              >
                <FormControl
                  className={classes.formControl}
                  fullWidth
                  variant="outlined"
                >
                  <InputLabel
                    id="demo-simple-select-outlined-label"
                  >
                    Sub Category
                  </InputLabel>
                  <Select
                    id="demo-simple-select-outlined"
                    label="Sub Category"
                    labelId="demo-simple-select-outlined-label"
                    name="subcategory_id"
                    onChange={handleChange}
                    value={values.subcategory_id}
                  >
                    <MenuItem value="0">
                      <em>{asteriokRed('SELECT SUBCATEGORY')}</em>
                    </MenuItem>
                    {subcategories.length > 0
                      ? subcategories.map(b => (
                        <MenuItem
                          key={b.id}
                          value={b.id}
                        >{b.name_english}</MenuItem>
                      ))
                      : null}
                  </Select>
                  <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{errors.subcategory_idError}</div>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

ProductInfo.propTypes = {
  brands: PropTypes.array.isRequired,
  categories: PropTypes.array.isRequired,
  className: PropTypes.string,
  info: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  shops: PropTypes.array.isRequired,
  subcategories: PropTypes.array.isRequired
};

export default ProductInfo;

import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles, withStyles } from '@material-ui/styles';
import {
  Card,
  CardContent,
  Grid,
  CardHeader,
  Divider,
  Button
} from '@material-ui/core';
import { Item } from './components';
import { purple, indigo } from '@material-ui/core/colors';

const AddButton = withStyles((theme) => ({
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

}))(Button)

const useStyles = makeStyles(theme => ({
  root: {},
  files: {
    marginTop: theme.spacing(3)
  }
}));

const Variants = props => {
  const { className, data, setData, onChange, onRemove, onChangeFile, ...rest } = props;

  const addNewVariant = () => {
    const myData = [...data, {
      qty: parseInt(0),
      color: '',
      size: '',
      price: parseInt(0),
      images: [],
      qtyError: '',
      priceError: '',
      colorError: '',
      sizeError: '',
    }]
    setData([...myData]);
    onChange([...myData]);
  };

  const removeVariant = (index) => {

    data.splice(index, 1);
    onRemove(index);

  }

  const handleChange = (event, index) => {

    const { name, value } = event.target;
    const myData = [...data];
    const error = name + 'Error';
    let message;

    if (name === 'qty' || name === 'price') {
      if (value.length < 1) {
        message = `${name.toUpperCase().replace(/_/g, ' ')} is required.`;
        insertData(myData, index, name, value, error, message);

      }

      else if (name === 'qty' && value.length > 6) {
        message = `Quantity is less than 1,000,000`;
        insertData(myData, index, name, value, error, message);
      }

      else if (name === 'price' && value.length > 10) {
        message = `Price is less than 10,000,000,000`;
        insertData(myData, index, name, value, error, message);
      }

      else {
        message = "";
        insertData(myData, index, name, value, error, message);
      }
    }
    else if (name === 'color' || name === 'size') {

      if (name === 'color' && value.length > 20) {
        message = `Characters should be 20 or less`;
        insertData(myData, index, name, value, error, message);
      }

      else if (name === 'size' && value.length > 20) {
        message = `Characters should be 20 or less`;
        insertData(myData, index, name, value, error, message);
      }

      else {
        message = "";
        insertData(myData, index, name, value, error, message);
      }
    }
    else {
      message = "";
      insertData(myData, index, name, value, error, message);
    }

  };

  const insertData = (myData, index, name, value, error, message) => {
    myData[index] = {
      ...myData[index],
      [name]: value,
      [error]: message
    };
    setData([...myData]);
    onChange([...myData]);
  }

  const handleChangeFile = (files, index) => {

    let myData = null;

    setData(data => {
      myData = data.map((d, i) => {
        if (i === index) {
          d.images = [...files];
        }
        return d;
      })
      return myData;
    });

    onChangeFile(myData);
  };

  const classes = useStyles();

  console.log('MY DATA', data);

  return (
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
        <CardHeader
          action={
            <AddButton
              onClick={addNewVariant}
              variant="outlined"
            >
              ADD VARIANT
            </AddButton>
          }
          title="Product Variants"
        />
        <Divider />
        <CardContent>
          {data.map((variant, index) => (
            <Item
              index={index}
              key={index}
              images={variant.images}
              newVariant={addNewVariant}
              remove={removeVariant}
              onChange={handleChange}
              onChangeFile={handleChangeFile}
              variant={variant}
            />
          ))}
        </CardContent>
      </Card>
    </Grid>
  );
};

Variants.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onChangeFile: PropTypes.func.isRequired
};

export default Variants;

import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import { Grid, Divider, TextField, FormControl, Button } from '@material-ui/core';
import NumberFormat from 'react-number-format';
import { FilesDropzone } from 'components';
import { makeStyles, withStyles } from '@material-ui/styles';
import { purple, indigo, red } from '@material-ui/core/colors';


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

const RemoveButton = withStyles((theme) => ({
  root: {
    marginTop: '10px',
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: red[900],
    '&:hover': {
      backgroundColor: red[900],
      textDecoration: 'underline',
      textDecorationColor: red[900]
    },

    textDecoration: 'underline',
    textDecorationColor: red[900]
  },

}))(Button)

const useStyles = makeStyles(theme => ({
  root: {},
  files: {
    marginTop: theme.spacing(3)
  }
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
}

const Item = ({ variant, onChange, newVariant, onChangeFile, images, remove, index }) => {
  const classes = useStyles();
  const handleChangeFile = (files) => {
    onChangeFile(files, index);
  };

  const asteriokRed = (name) => {
    return <span>{name} <span style={{ color: 'red' }}>*</span></span>
  }

  return (
    <Fragment>
      {
        index > 0 ?
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <AddButton
              style={{ marginRight: '5px' }}
              onClick={newVariant}
              variant="outlined"
            >
              ADD VARIANT
            </AddButton>
            <RemoveButton
              onClick={() => remove(index)}
              color="primary"
              variant="outlined"
            >
              REMOVE VARIANT
            </RemoveButton>
          </div> : null
      }
      <Grid
        container
        spacing={3}
        style={{ marginTop: '1rem' }}
      >
        <Grid
          item
          lg={3}
          md={3}
          xs={6}
        >
          <FormControl
            className={classes.formControl}
            fullWidth
            variant="outlined"
          >
            <TextField
              fullWidth
              label={asteriokRed('Product Quantity')}
              name="qty"
              onChange={e => onChange(e, index)}
              value={variant.qty}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{variant.qtyError}</div>
          </FormControl>
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          xs={6}
        >
          <FormControl
            className={classes.formControl}
            fullWidth
            variant="outlined"
          >
            <TextField
              fullWidth
              label={asteriokRed('Product Price')}
              name="price"
              onChange={e => onChange(e, index)}
              value={variant.price}
              InputProps={{
                inputComponent: NumberFormatCustom
              }}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{variant.priceError}</div>
          </FormControl>
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          xs={6}
        >
          <FormControl
            className={classes.formControl}
            fullWidth
            variant="outlined"
          >
            <TextField
              fullWidth
              label="Product Color"
              name="color"
              onChange={e => onChange(e, index)}
              value={variant.color}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{variant.colorError}</div>
          </FormControl>
        </Grid>
        <Grid
          item
          lg={3}
          md={3}
          xs={6}
        >
          <FormControl
            className={classes.formControl}
            fullWidth
            variant="outlined"
          >
            <TextField
              fullWidth
              label="Product Size"
              name="size"
              onChange={e => onChange(e, index)}
              value={variant.size}
              variant="outlined"
            />
            <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{variant.sizeError}</div>
          </FormControl>
        </Grid>
        <Grid
          item
          lg={12}
          md={12}
          xs={12}
        >
          <FilesDropzone red={true} images={images} onChangeFile={handleChangeFile} />
        </Grid>
      </Grid>
      <Divider
        style={{ margin: '1rem' }}
        variant="inset"
      />
    </Fragment>
  );
};

Item.propTypes = {
  index: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  onChangeFile: PropTypes.func.isRequired,
  variant: PropTypes.object.isRequired
};

export default Item;

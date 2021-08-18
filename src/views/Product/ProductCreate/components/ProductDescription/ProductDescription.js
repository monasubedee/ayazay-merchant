import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  Divider
} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';
import { RichEditor } from 'components';

const useStyles = makeStyles(theme => ({
  root: {},
}));


const ProductDescription = ({ className, error, setError, onChange, description, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    description_myanmar: description.description_myanmar,
    description_english: description.description_english
  });

  const errorChange = (name, value, errorName) => {

    if (value.getCurrentContent().getPlainText().length === 0) {
      setError({
        ...error,
        [name]: `${errorName} is requried.`
      })

    }
    else if (value.getCurrentContent().getPlainText().length > 300) {
      setError({
        ...error,
        [name]: `Characters should be ${300} characters or less.`
      })
    }
    else {
      setError({
        ...error,
        [name]: ""
      })
    }
  }

  const handleChangeMyanmar = (editorState) => {
    const value = editorState
    const error = "description_myanmarError";
    const errorName = "Description Myanmar";
    errorChange(error, value, errorName);

    setValues({
      ...values,
      'description_myanmar': value
    });

    onChange('description_myanmar', value);
  }

  const handleChangeEnglish = (editorState) => {
    const value = editorState;
    const error = "description_englishError";
    const errorName = 'Description English';
    errorChange(error, value, errorName);

    setValues({
      ...values,
      'description_english': value
    });

    onChange('description_english', value);
  }

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
          <CardHeader title="Product Description" />
          <Divider />
          <CardContent>
            <Grid
              item
              md={12}
              xs={12}
            >
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{ marginBottom: '1rem' }}
              >
                {asteriokRed('Product Description (MM)')}
              </InputLabel>
              <RichEditor
                onChangeEditor={handleChangeMyanmar}
                placeholder="Say something about the product..."
                value={values.description_myanmar}
              />
              <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{error.description_myanmarError}</div>
            </Grid>
            <Grid
              item
              md={12}
              xs={12}
            >
              <InputLabel
                id="demo-simple-select-outlined-label"
                style={{ marginBottom: '1rem', marginTop: '1rem' }}
              >
                {asteriokRed('Product Description (EN)')}
              </InputLabel>
              <RichEditor
                onChangeEditor={handleChangeEnglish}
                placeholder="Say something about the product..."
                value={values.description_english}
              />
              <div style={{ color: 'red', paddingTop: '10px', fontSize: '13px' }}>{error.description_englishError}</div>
            </Grid>
          </CardContent>
        </Card>
      </Grid>

    </Grid>
  )
}

ProductDescription.propTypes = {
  className: PropTypes.string,
  description: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};

export default ProductDescription;
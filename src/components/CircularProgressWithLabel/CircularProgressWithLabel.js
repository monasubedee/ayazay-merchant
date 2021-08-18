import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

const  CircularProgressWithLabel = (props) => {
  return (
    <Fragment>
      <Grid
        alignItems="center"
        container
        justify="center"
        justifyContent="center"
        style={{width : '100%', height : '100%'}}
      >
  
        <Box
          display="inline-flex"
          position="relative"
        >
          <CircularProgress
            variant="static"
            {...props}
            size={100}
            thickness={2.0}
          />
          <Box
            alignItems="center"
            bottom={0}
            display="flex"
            justifyContent="center"
            left={0}
            position="absolute"
            right={0}
            top={0}
          >
            <Typography
              color="textSecondary"
              component="div"
              variant="caption"
            >{`${Math.round(
                props.value,
              )}%`}</Typography>
          </Box>
        </Box>
      </Grid>
    </Fragment>
  );
}

CircularProgressWithLabel.propTypes = {
  /**
   * The value of the progress indicator for the determinate and static variants.
   * Value between 0 and 100.
   */
  value: PropTypes.number.isRequired,
};
export default CircularProgressWithLabel;
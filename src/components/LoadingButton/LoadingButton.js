import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@material-ui/core';
import styles from './LoadingButton.module.scss';

const LoadingButton = ({ text, handleClick, loading, bgcolor, color }) => (
  <Button
    className={styles.button}
    disabled={loading}
    onClick={!loading ? handleClick : null}
    style={{ background: `${bgcolor}`, color: `${color}` }}
  >
    {!loading ? (
      <span className={styles.text}>{text}</span>
    ) :
      <span className={styles.ellipsis}>
        <div />
        <div />
        <div />
        <div />
      </span>
    }
  </Button>
);

Button.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default LoadingButton;

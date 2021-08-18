import React from 'react';
import checkOperator from '../../utils/operatorChecker';

const MaskedInput = ({
  mask,
  value,
  onChange,
  onErrorCheck,
  ...otherProps
}) => {
  const handleChange = e => {
    const val = e.target.value;
    const cleanVal = val.replace(/[^\d]/g, '');

    if (cleanVal.length > 8 && checkOperator(cleanVal) === 0) {
      onErrorCheck(true);
    } else {
      onErrorCheck(false);
    }
    onChange(cleanVal);
  };

  const format = (value, mask) => {
    let i = 0;
    let lastReplacedIndex = -1;
    const filledMask = mask.replace(/#/g, (_, j) => {
      if (i >= value.length) {
        return '#';
      }
      lastReplacedIndex = j;
      return value[i++];
    });
    return filledMask.substring(0, lastReplacedIndex + 1);
  };

  return (
    <input
      onChange={handleChange}
      value={format(value, mask)}
      {...otherProps}
      type={Number}
    />
  );
};

export default MaskedInput;

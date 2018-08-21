import React from 'react';
import PropTypes from 'prop-types';

import { DateValue } from './styles';

const DayDisplay = ({ onHandleClick, value, disabled, selected }) => (
  <DateValue
    onClick={!disabled ? onHandleClick : undefined}
    selected={selected}
    disabled={disabled}
  >
    {value}
  </DateValue>
);

DayDisplay.propTypes = {
  onHandleClick: PropTypes.func,
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  selected: PropTypes.bool,
};

export default DayDisplay;

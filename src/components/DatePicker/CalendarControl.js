import React from 'react';
import PropTypes from 'prop-types';
import { PeriodSelector, PeriodDate, PeriodButton } from './styles';

const CalendarControl = ({ title, buttonClick, titleClick = undefined }) => (
  <PeriodSelector>
    <PeriodButton left onClick={() => buttonClick('prev')}>
      <i className="fas fa-angle-left" />
    </PeriodButton>
    <PeriodDate onClick={titleClick}>{title}</PeriodDate>
    <PeriodButton right onClick={() => buttonClick('next')}>
      <i className="fas fa-angle-right" />
    </PeriodButton>
  </PeriodSelector>
);

CalendarControl.propTypes = {
  title: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  titleClick: PropTypes.func,
};

export default CalendarControl;

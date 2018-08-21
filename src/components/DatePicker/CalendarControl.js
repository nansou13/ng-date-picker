import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PropTypes from 'prop-types'
import React from 'react'
import { PeriodButton, PeriodDate, PeriodSelector } from './styles'

const CalendarControl = ({ title, buttonClick, titleClick = undefined }) => (
  <PeriodSelector>
    <PeriodButton left onClick={() => buttonClick('prev')}>
      <FontAwesomeIcon icon={faAngleLeft} />
    </PeriodButton>
    <PeriodDate onClick={titleClick}>{title}</PeriodDate>
    <PeriodButton right onClick={() => buttonClick('next')}>
      <FontAwesomeIcon icon={faAngleRight} />
    </PeriodButton>
  </PeriodSelector>
)

CalendarControl.propTypes = {
  title: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  titleClick: PropTypes.func,
}

export default CalendarControl

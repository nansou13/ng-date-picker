import Moment from 'moment';

import { MAX_DAYS, MAX_YEARS, YEAR_SELECTED, MONTH_SELECTED } from './constants';

const manageDayDisplay = (periodMoments, selectedDate, updateFunction, props) => {
  const beginPeriod = periodMoments.clone().startOf('isoWeek');
  const endPeriod = beginPeriod.clone().add(MAX_DAYS, 'd');

  const handleClickFunction = (currentDay) => updateFunction(currentDay);
  const selectedFunction = (currentDay) => selectedDate && currentDay.isSame(selectedDate, 'day');

  const disabledFunction = (currentDay, periodMoment) =>
    !currentDay.isSame(periodMoment, 'month') ||
    (props.disableBeforeToday && !currentDay.isSameOrAfter(Moment(), 'day')) ||
    (props.weekDayOff && props.weekDayOff.includes(currentDay.isoWeekday())) ||
    (props.disabledDates && props.disabledDates.includes(currentDay.format('DD/MM/YYYY')));

  return { beginPeriod, endPeriod, handleClickFunction, selectedFunction, disabledFunction };
};

const manageMonthDisplay = (periodMoments, selectedDate, updateFunction) => {
  const beginPeriod = periodMoments.clone().startOf('year');
  const endPeriod = periodMoments.clone().endOf('year');

  const handleClickFunction = (currentDay) => updateFunction(currentDay, MONTH_SELECTED);
  const selectedFunction = (currentDay) => selectedDate && currentDay.isSame(selectedDate, 'month');
  const disabledFunction = () => 1 === 2; // (!currentDay.isSame(periodMoment, 'month') || !currentDay.isSameOrAfter(Moment(), 'day'))

  return { beginPeriod, endPeriod, handleClickFunction, selectedFunction, disabledFunction };
};

const manageYearDisplay = (periodMoments, selectedDate, updateFunction) => {
  const initFirstYear = parseInt(periodMoments.clone().year() / 10, 10) * 10 - 1;

  const beginPeriod = Moment().year(initFirstYear);
  const endPeriod = beginPeriod.clone().add(MAX_YEARS, 'Y');

  const handleClickFunction = (currentDay) => updateFunction(currentDay, YEAR_SELECTED);

  const selectedFunction = () => 1 === 2; // (selectedDate && currentDay.isSame(selectedDate, 'day'))
  const disabledFunction = () => 1 === 2; // (!currentDay.isSame(periodMoment, 'month') || !currentDay.isSameOrAfter(Moment(), 'day'))

  return { beginPeriod, endPeriod, handleClickFunction, selectedFunction, disabledFunction };
};

export const manageDisplay = {
  days: manageDayDisplay,
  month: manageMonthDisplay,
  year: manageYearDisplay,
};

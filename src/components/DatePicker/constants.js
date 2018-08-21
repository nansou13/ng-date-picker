export const YEAR_SELECTED = 'year';
export const DAYS_SELECTED = 'days';
export const MONTH_SELECTED = 'month';

export const MAX_YEARS = 21;
export const MAX_DAYS = 41;

export const CONF = {
  days: {
    sameBeforePeriod: 'day',
    displayFormat: 'DD',
    displayTitle: 'MMMM YYYY',
    addPeriodWhile: 'd',
    moduloValue: 7,
  },
  month: {
    sameBeforePeriod: 'years',
    displayFormat: 'MMM',
    displayTitle: 'YYYY',
    addPeriodWhile: 'M',
    moduloValue: 4,
  },
  year: {
    sameBeforePeriod: 'years',
    displayFormat: 'YYYY',
    displayTitle: 'Années...',
    addPeriodWhile: 'Y',
    moduloValue: 4,
  },
};

import React, { Component } from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'
import shortid from 'shortid'

import {
  Calendar,
  ContainerBlock,
  SimpleDisplay,
  SCDayRow,
  SCCalendarModal,
} from './styles'
import DayDisplay from './DayDisplay'
import CalendarControl from './CalendarControl'
import TimeDisplay from './TimeDisplay'
import {
  YEAR_SELECTED,
  DAYS_SELECTED,
  MONTH_SELECTED,
  MAX_YEARS,
  CONF,
} from './constants'

import { manageDisplay } from './manageDisplay'

import withClickOutside from './withClickOutside'

class CalendarDisplay extends Component {
  state = {
    selected: {
      moment: this.props.selectedValue
        ? Moment(this.props.selectedValue, 'DD/MM/YYYY')
        : false,
      hour: false,
      minute: false,
    },
    period: this.props.startPeriod
      ? Moment(this.props.startPeriod)
      : Moment().date(1),
    typeSelector: this.props.firstSelector || DAYS_SELECTED,
  }

  /*
    Arrows function : type ('next' or 'prev)
  */
  handleClickPeriod = (type) => {
    const { typeSelector, period } = this.state
    const durationType = typeSelector === DAYS_SELECTED ? 'month' : 'year'
    const duration = typeSelector === YEAR_SELECTED ? MAX_YEARS : 1

    if (type === 'prev') period.subtract(duration, durationType)
    else period.add(duration, durationType)

    this.setState({ period })
  }

  updateTypeSelector = () => {
    const { typeSelector } = this.state
    let typeSelectorUpdate = DAYS_SELECTED

    if (typeSelector === DAYS_SELECTED) typeSelectorUpdate = MONTH_SELECTED
    if (typeSelector === MONTH_SELECTED) typeSelectorUpdate = YEAR_SELECTED

    this.setState({ typeSelector: typeSelectorUpdate })
  }

  initCalendar = () => {
    const {
      period: periodMoment,
      typeSelector,
      selected: { moment: selectedDate = null },
    } = this.state

    const { weekDayOff, disableBeforeToday, disabledDates } = this.props

    const {
      sameBeforePeriod,
      displayFormat,
      displayTitle,
      addPeriodWhile,
      moduloValue,
    } = CONF[typeSelector]
    const {
      beginPeriod,
      endPeriod,
      handleClickFunction,
      selectedFunction,
      disabledFunction,
    } = manageDisplay[typeSelector](
      periodMoment,
      selectedDate,
      typeSelector === DAYS_SELECTED ? this.dayHandleClick : this.periodUpdate,
      { weekDayOff, disableBeforeToday, disabledDates }
    )

    const title =
      typeSelector === YEAR_SELECTED
        ? displayTitle
        : periodMoment.format(displayTitle)

    const arrayResult = []
    let tArray = []
    let i = 1

    // DAY
    if (typeSelector === DAYS_SELECTED) {
      const dayText = Array(...Array(7)).map((_, iDay) => (
        <SimpleDisplay key={`weekDay-${shortid.generate()}`}>
          {Moment(iDay, 'e').format('ddd')}
        </SimpleDisplay>
      ))
      arrayResult.push(dayText)
    }

    while (beginPeriod.isSameOrBefore(endPeriod, sameBeforePeriod)) {
      const currentPeriode = beginPeriod.clone()

      tArray.push(
        <DayDisplay
          key={currentPeriode}
          value={currentPeriode.format(displayFormat)}
          disabled={disabledFunction(currentPeriode, periodMoment)}
          selected={selectedFunction(currentPeriode)}
          onHandleClick={() => handleClickFunction(currentPeriode)}
        />
      )

      if (i % moduloValue === 0) {
        arrayResult.push(tArray)
        tArray = []
      }

      i += 1
      beginPeriod.add(1, addPeriodWhile)
    }

    return { values: arrayResult, title }
  }

  dayHandleClick = (momentDate, type = null) => {
    let updateValue = {}
    switch (type) {
      case 'minute':
        updateValue = { moment: momentDate, minute: momentDate.format('mm') }
        break
      case 'hour':
        updateValue = { moment: momentDate, hour: momentDate.format('HH') }
        break

      default:
        updateValue = {
          moment: momentDate.clone().startOf('day'),
          minute: false,
          hour: false,
        }
        break
    }

    this.setState(
      { selected: { ...this.state.selected, ...updateValue } },
      () => {
        if (this.props.withTime) {
          if (type === 'minute') {
            this.props.validateSelection(this.state.selected.moment)
          }
        } else {
          this.props.validateSelection(this.state.selected.moment)
        }
      }
    )
  }
  periodUpdate = (momentDate, type = null) => {
    let update = { period: momentDate, typeSelector: DAYS_SELECTED }

    if (type === YEAR_SELECTED) {
      update = { ...update, typeSelector: MONTH_SELECTED }
    }
    this.setState(update)
  }

  render() {
    const { typeSelector } = this.state
    const { title, values } = this.initCalendar()

    return (
      <SCCalendarModal>
        <Calendar>
          <CalendarControl
            title={title}
            buttonClick={this.handleClickPeriod}
            titleClick={this.updateTypeSelector}
          />

          <ContainerBlock>
            {values.map((value) => (
              <SCDayRow key={`value-${shortid.generate()}`}>{value}</SCDayRow>
            ))}
          </ContainerBlock>

          {typeSelector === DAYS_SELECTED &&
            this.props.withTime && (
              <TimeDisplay
                selected={this.state.selected}
                handleClick={this.dayHandleClick}
              />
            )}
        </Calendar>
      </SCCalendarModal>
    )
  }
}

CalendarDisplay.propTypes = {
  selectedValue: PropTypes.string,
  validateSelection: PropTypes.func.isRequired,
  withTime: PropTypes.bool,
  weekDayOff: PropTypes.array,
  disableBeforeToday: PropTypes.bool,
  firstSelector: PropTypes.string,
  startPeriod: PropTypes.string,
  disabledDates: PropTypes.array,
}

export default withClickOutside(CalendarDisplay)

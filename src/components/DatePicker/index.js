import React, { Component } from 'react'
import Moment from 'moment'
import PropTypes from 'prop-types'

import './momentConfig'

import CalendarDisplay from './CalendarDisplay'

class DatePicker extends Component {
  state = {
    selected: '',
    display: false,
    inputValue: false,
  }

  onHandleClick = () => {
    this.setState({ display: !this.state.display })
  }

  onHandleChange = (e) => {
    const { withTime } = this.props
    if (!withTime) {
      const value = e.target.value || ''
      this.setState({ selected: value, inputValue: true, display: false })
    }
  }

  validateSelection = (value) => {
    const { withTime } = this.props
    const inputDateDisplay = withTime ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY'
    this.setState({ selected: value.format(inputDateDisplay), display: false })
  }

  closeCalendar = () => {
    if (this.state.inputValue) {
      const { withTime } = this.props
      const inputDateDisplay = withTime ? 'LLL' : 'L'

      const selected = this.state.selected
        ? Moment(this.state.selected, 'DD/MM/YYYY').format(inputDateDisplay)
        : ''

      this.setState({ display: false, selected, inputValue: false })
    } else {
      setTimeout(() => this.setState({ display: false }), 200)
    }
  }

  render() {
    const { withTime, render } = this.props

    return (
      <div style={{ position: 'relative' }}>
        {render({ toggle: this.onHandleClick, selected: this.state.selected })}

        {this.state.display && (
          <CalendarDisplay
            handleClickOutside={this.closeCalendar}
            selectedValue={this.state.selected}
            validateSelection={this.validateSelection}
            withTime={withTime}
            weekDayOff={this.props.weekDayOff}
            disableBeforeToday={this.props.disableBeforeToday}
            firstSelector={this.props.firstSelector}
            startPeriod={this.props.startPeriod}
            disabledDates={this.props.disabledDates}
          />
        )}
      </div>
    )
  }
}

DatePicker.propTypes = {
  withTime: PropTypes.bool,
  weekDayOff: PropTypes.array,
  disableBeforeToday: PropTypes.bool,
  firstSelector: PropTypes.string,
  startPeriod: PropTypes.string,
  disabledDates: PropTypes.array,
  render: PropTypes.func.isRequired,
}

export default DatePicker

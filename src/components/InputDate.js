import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons'
import DatePicker from './DatePicker'

export const SCDateHolder = styled.div`
  position: relative;
  width: 300px;
  input {
    // border: none;
    user-select: none;
    // background: transparent;
    font-size: 1.5rem;
    // padding-right: 2rem;
    width: 100%;
    outline: none;
  }

  svg {
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
  }
`

const InputDate = (props) => (
  <DatePicker
    selected={props.value}
    withTime={props.withTime}
    render={(dateProps) => <InputDateBase datepicker={dateProps} {...props} />}
    {...props}
  />
)

class InputDateBase extends React.Component {
  static getDerivedStateFromProps = (props) => {
    props.handleChange(props.datepicker.selected)
    return {
      value: props.datepicker.selected,
    }
  }

  state = {
    value: this.props.value,
  }

  render() {
    const { toggle } = this.props.datepicker

    return (
      <SCDateHolder>
        <input value={this.state.value} type="text" onClick={toggle} readOnly />
        <FontAwesomeIcon icon={faCalendarAlt} onClick={toggle} />
      </SCDateHolder>
    )
  }
}

InputDateBase.propTypes = {
  value: PropTypes.string.isRequired,
  datepicker: PropTypes.object.isRequired,
}

InputDate.propTypes = {
  withTime: PropTypes.bool.isRequired,
  value: PropTypes.string,
}

export default InputDate

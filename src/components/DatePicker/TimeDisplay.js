import React, { Component } from 'react';
import PropTypes from 'prop-types';

import DayDisplay from './DayDisplay';
import CalendarControl from './CalendarControl';
import { MinuteSelector, ContainerBlock } from './styles';

class TimeDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hours: {
        content: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        currentPage: 0,
        slice: 0,
      },
      minutes: [0, 15, 30, 45],
    };
  }

  timeClick = (id) => {
    const values = this.state.hours;
    const nb = values.content.length;
    const maxContent = 7;

    let slice = 0;

    if (id === 'next') {
      if (values.slice + maxContent * 2 > nb) {
        slice = nb - maxContent;
      } else {
        slice = values.slice + maxContent;
      }
    } else if (values.slice - maxContent >= 0) {
      slice = values.slice - maxContent;
    }
    this.setState({ hours: { ...this.state.hours, slice } });
  };

  render() {
    const { hours, minutes } = this.state;
    const {
      selected: { moment: selected, hour, minute },
      handleClick,
    } = this.props;
    return (
      <div>
        <CalendarControl title="Heures" buttonClick={this.timeClick} />
        <ContainerBlock>
          {hours.content
            .slice(hours.slice, hours.slice + 7)
            .map((currentHour) => (
              <DayDisplay
                key={`hour-${currentHour}`}
                value={`0${currentHour}`.slice(-2)}
                disabled={!selected}
                selected={selected && hour == currentHour}
                onHandleClick={() => handleClick(selected.clone().hour(currentHour), 'hour')}
              />
            ))}
        </ContainerBlock>
        <MinuteSelector disabled={!hour}>
          {minutes.map((currentMinute) => (
            <DayDisplay
              key={`minute-${currentMinute}`}
              value={`0${currentMinute}`.slice(-2)}
              selected={selected && minute == currentMinute}
              onHandleClick={() => handleClick(selected.clone().minute(currentMinute), 'minute')}
            />
          ))}
        </MinuteSelector>
      </div>
    );
  }
}

TimeDisplay.propTypes = {
  selected: PropTypes.any,
  handleClick: PropTypes.func,
};

export default TimeDisplay;

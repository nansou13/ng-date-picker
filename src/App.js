import React, { Component } from 'react';
import DatePicker from './components/DatePicker'

class App extends Component {
  //withTime
  render() {
    
      return (
        <DatePicker 
          weekDayOff={[1,7]}  
          disableBeforeToday
          // firstSelector="year"
          // startPeriod="01/01/1986"
          disabledDates={['24/07/2018', '26/07/2018']}
          withTime
        />    
      );
    }
  }

export default App;

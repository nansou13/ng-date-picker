import React, { Component } from 'react'
import InputDate from './components/InputDate'

class App extends Component {
  // withTime
  state = {
    value: '18-03-1986',
  }
  onChange(e) {
    // this.setState({ value: e.target.value })
  }

  render() {
    const { value } = this.state
    return (
      <InputDate
        withTime
        value={value}
        handleChange={this.onChange}
        disableBeforeToday
      />
    )
  }
}

export default App

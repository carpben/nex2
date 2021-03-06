import React from 'react';
import DayPicker from 'react-day-picker';
import onClickOutside from 'react-onclickoutside'

import 'react-day-picker/lib/style.css';

class DayPickerW extends React.Component {
  constructor(props) {
    super(props);
    // this.handleDayClick = this.handleDayClick.bind(this);
    // this.state = {
    //   selectedDay: undefined,
    // };
  }
  handleDayClick = (day) => {
     this.props.changeDate(this.props.notKey, day)
    // this.setState({ selectedDay: day });
  }
  handleClickOutside = () => {
     this.props.hideDisplay()

 }
  render() {
     const date = this.props.date? this.props.date: undefined;
    return (
      <div className="day-picker-w">
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={date}
        />
        {/*date ? (
          <p>You clicked {date.toLocaleDateString()}</p>
        ) : (
          <p>Please select a day.</p>
       )*/}
      </div>
    );
  }
}

export default onClickOutside(DayPickerW)

import React, { Component, PropTypes } from 'react';
import DayPicker from "react-day-picker";

import { localeUtils } from "react-day-picker/moment";

import "../calendarStyle.css";

import "moment/locale/es";

export default class Calendar extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedDay: null
    };
  }

  handleDayClick(e, day, modifiers) {
    this.setState({
      selectedDay: day
    });
  }

  

  renderDay(day){
    const birthdays = {
      3: [{ name: "Mirko", age: 35 }, {name: "Gianluca", age: 29 }],
      8: [{ name: "Elena", age: 21 }],
      9: [{ name: "Irene", age: 43 }],
      12: [{ name: "Paolo", age: 78 }, {name: "Giorgia", age: 18 }],
      18: [{ name: "Claudia", age: 54 }],
      22: [{ name: "Maria", age: 9 }, {name: "Luigi", age: 67 }],
      25: [{ name: "Simone", age: 31 }],
      26: [{ name: "Marta", age: 46 }]
    };
    const date = day.getDate();
    return (
      <div>
        <span>{ date }</span>
        <div className="Birthdays-List">
          { birthdays[date] &&
            birthdays[date].map((birthday, i) =>
              <div key={i}>
                🎁 { birthday.name } ({ birthday.age})
              </div>
            )
          }
        </div>
      </div>
    );
  }



  render() {
        
    return(
      <div className="article">
        <DayPicker className="Birthdays" renderDay={ this.renderDay } localeUtils={ localeUtils } locale="es" onDayClick={ this.handleDayClick.bind(this) }/>
        <div>
          Selected: { this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : "Select"}
        </div>
      </div>
    );
  }


}


Calendar.propTypes = {
};

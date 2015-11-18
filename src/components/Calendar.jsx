import React, { Component, PropTypes } from 'react';
import DayPicker from 'react-day-picker';
import { localeUtils } from 'react-day-picker/moment';
import '../calendarStyle.css';
import 'moment/locale/es';


export default class Calendar extends Component {

  constructor(props){
    super(props);
    this.state = {
      selectedDay: null,
      birthdays: {
        3: [{ name: 'Pepe', age: 35 }, {name: 'Juan', age: 29 }],
        8: [{ name: 'Elena', age: 21 }],
        9: [{ name: 'Irene', age: 43 }],
        12: [{ name: 'Pepa', age: 78 }, {name: 'Alba', age: 18 }],
        18: [{ name: 'Claudia', age: 54 }],
        22: [{ name: 'Maria', age: 9 }],
        26: [{ name: 'Marta', age: 46 }]
      },
      pendingTasks: []
    };
  }

  handleDayClick(e, day, modifiers) {
        
    const numberDay = day.getDate().toString();

    let tasks = '';

    for (let key in this.state.birthdays) {
      if (numberDay === key) {
        tasks += this.state.birthdays[key].map( (task, index) =>  'Es el cumpleaños de ' + 
          task.name + ' y cumple ' + task.age + ' años.');
      }
    }

    if (tasks === '') {
      tasks += 'Nada planeado para este día.';
    };

    this.setState({
      selectedDay: day,
      pendingTasks: tasks
    });
        
  }



  renderDay(day){
    let birthdays = this.state.birthdays;
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
        <DayPicker className="Birthdays" renderDay={ this.renderDay.bind(this) } localeUtils={ localeUtils } locale="es" onDayClick={ this.handleDayClick.bind(this) }/>
        <div>
          Selected: { this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : 'Select'}
          <br/><br/>
          Pending tasks: { this.state.selectedDay ? this.state.pendingTasks : 'Nada seleccionado'}
        </div>
      </div>
    );
  }


}


Calendar.propTypes = {
};

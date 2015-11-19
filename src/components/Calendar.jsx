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
        2015: {
          "Noviembre": {
            3: [{ name: 'Pepe', age: 35 }, {name: 'Juan', age: 29 }],
            8: [{ name: 'Elena', age: 21 }],
            9: [{ name: 'Irene', age: 43 }],
            12: [{ name: 'Pepa', age: 78 }, {name: 'Alba', age: 18 }],
            18: [{ name: 'Claudia', age: 54 }],
            22: [{ name: 'Maria', age: 9 }],
            26: [{ name: 'Marta', age: 46 }]
          },
          "Diciembre": {
            2: [{name: "Oscar", age: 20}]
          }
        },
        2016: {
          "Enero": {
            1: [{name: "Junaito", age:99}]
          }
        }

      },
      months: ['Enero', 'Febrero', 'Marzo', 
      'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      pendingTasks: []
    };
  }

  handleDayClick(e, day, modifiers) {
    
    const numberDay = day.getDate().toString();
    let month = this.state.months[day.getMonth()];
    let year = (1900 + day.getYear()).toString();
    
    let birthdays = {};
    
    for (let key in this.state.birthdays) {
      if (year === key){
        for (let key2 in this.state.birthdays[key]){
          if (key2 === month) {
            birthdays = this.state.birthdays[key][key2];
          }
        }
      }
    }
    
    let tasks = '';

    for (let key in birthdays) {
      if (numberDay === key) {
        tasks += birthdays[key].map( (task, index) =>  'Es el cumpleaños de ' + 
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

    let month = this.state.months[day.getMonth()];
    let birthdays = {};
    let year = (1900 + day.getYear()).toString();

    for (let key in this.state.birthdays) {
      if (year === key){

        for (let key2 in this.state.birthdays[key]){
          if (key2 === month) {

            birthdays = this.state.birthdays[key][key2];
          }
        }
      }
    }

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
        <DayPicker className="Birthdays" canChangeMonth={ true } renderDay={ this.renderDay.bind(this) } localeUtils={ localeUtils } locale="es" onDayClick={ this.handleDayClick.bind(this) }/>
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

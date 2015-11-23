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
      months: ['Enero', 'Febrero', 'Marzo', 
      'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
      pendingTasks: []
    };
  }

  getCalendar(day){
    
    const calendar = this.props.calendar;

    let month = this.state.months[day.getMonth()];
    let year = (1900 + day.getYear()).toString();
    
    let dates = {};
    
    for (let key in calendar) {
      if (year === key){
        for (let key2 in calendar[key]){
          if (key2 === month) {
            dates = calendar[key][key2];
          }
        }
      }
    }

    return dates;

  }

  handleDayClick(e, day, modifiers) {

    
    const numberDay = day.getDate().toString();
    
    const dates = this.getCalendar(day);

    let tasks = '';

    for (let key in dates) {
      if (numberDay === key) {
        debugger;
        tasks += dates[key].map( (task, index) =>  'Tienes que hacer la tarea ' + 
          task.title + ' con una importancia de: ' + task.importance);
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

    const dates = this.getCalendar(day);

    const date = day.getDate();
    return (
      <div>
        <span>{ date }</span>
        <div className="Birthdays-List">
          { dates[date] &&
            dates[date].map((list, i) =>
              <div key={i}>
                🎁 { list.title } ({ list.importance})
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

import React, { Component, PropTypes } from 'react';
import DayPicker from 'react-day-picker';

import { Link } from 'react-router';

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

  handleDayClick(e, day) {

    const numberDay = day.getDate().toString();
    
    const dates = this.getCalendar(day);

    let tasks = true;
    let pendingTasks;

    for (let key in dates) {
      if (numberDay === key) {
        pendingTasks = (<ul>
          {
            dates[key].map( (task, index) =>  <li key={index}><span>Tienes que hacer la tarea</span> <Link to={`/list/${task.id}`}>{task.title}</Link> <span> con una importancia de: </span></li>)
          }
        </ul>);
        tasks = false;
      }
    }

    if (tasks) {
      pendingTasks = 'Nada planeado para este día.';
    };

    this.setState({
      selectedDay: day,
      pendingTasks
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
                🎁 { list.title } ({ list.importance })
              </div>
            )
          }
        </div>
      </div>
    );
  }



  render() {
        
    return(
      <div>
        <DayPicker className="Birthdays" canChangeMonth renderDay={ this.renderDay.bind(this) } localeUtils={localeUtils} locale="es" onDayClick={ this.handleDayClick.bind(this) }/>
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
  calendar: PropTypes.object
};


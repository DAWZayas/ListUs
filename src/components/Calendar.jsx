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

  componentWillMount() {
    this.props.registerListeners();
  }

  componentWillUnmount() {
    this.props.unregisterListeners();
  }

  getCalendar(day){

    let month = this.state.months[day.getMonth()];
    let year = (1900 + day.getYear()).toString();

    let dates = {};

    const calendarUser = this.props.calendar;

    if(calendarUser.constructor === Array){
      calendarUser.map( function(calendar){
        for (let key in calendar) {
          if (year === key){
            for (let key2 in calendar[key]){
              if (key2 === month) {
                Object.assign(dates, calendar[key][key2]);
              }
            }
          }
        }
      });
    }

    return dates;

  }

  handleDayClick(e, day) {


    const numberDay = day.getDate().toString();

    const dates = this.getCalendar(day);

    let tasks = true;
    let pendingTasks;


    let iterableDates = dates[numberDay];


    if (iterableDates) {
      iterableDates = Object.values(iterableDates).reduce( (init, id) => init.concat({id}), [] );
    }


    let arrayObjectsDays = [];
    if(iterableDates!==undefined && this.props.lists.length!==0){
      arrayObjectsDays = iterableDates.map( listOfTheDay =>
        this.props.lists.filter( listOfArrayList =>
          listOfTheDay.id===listOfArrayList.id ? listOfArrayList : null ));
    }
    for (let key in dates) {
      if (numberDay === key) {
        pendingTasks = (<ul>
          {
            arrayObjectsDays.map( (task, index) =>  <li className="taskBorder" key={index}><span>You have to do the list </span> <Link to={`/list/${task[0].id}`}>{task[0].title}</Link> <span> with an importance of: {task[0].importance}</span></li>)
          }
        </ul>);
        tasks = false;
      }
    }

    if (tasks) {
      pendingTasks = <ul><li className="taskBorder">Nothing planed for that day</li></ul>;
    };

    this.setState({
      selectedDay: day,
      pendingTasks
    });

  }



  renderDay(day){

    const dates = this.getCalendar(day);
    const date = day.getDate();

    let iterableDates = dates[date];

    if (iterableDates) {
      iterableDates = Object.values(iterableDates).reduce( (init, id) => init.concat({id}), [] );
    }

    let arrayObjectsDays = [];
    if(iterableDates!==undefined && this.props.lists.length!==0){
      arrayObjectsDays = iterableDates.map( listOfTheDay =>
        this.props.lists.filter( listOfArrayList =>
          listOfTheDay.id===listOfArrayList.id ? listOfArrayList : null ));
    }


    return (
      <div>
        <span>{ date }</span>
        <div className="Birthdays-List">
          { arrayObjectsDays.length!==0 ?
            arrayObjectsDays.map((list, i) => list.length !== 0 ? (
              <div className="smallerLetter" key={i}>
                🎁 {list[0].title}, {list[0].importance} imp.
              </div>)
            :('')
            )
          : ''}
        </div>
      </div>
    );
  }



  render() {
    return(
      <div>
        <DayPicker className="Birthdays" canChangeMonth renderDay={ this.renderDay.bind(this) } localeUtils={localeUtils} locale="es" onDayClick={ this.handleDayClick.bind(this) }/>
        <div className="calendarInfo">
          <span className="pending"><b>Selected</b></span>:<br/><br/> { this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : 'Select'}
          <br/><br/>
          <span className="pending"><b>Pending tasks</b></span>: { this.state.selectedDay ? this.state.pendingTasks : 'Nothing selected'}
        </div>
      </div>
    );
  }

}

Calendar.propTypes = {
  calendar: PropTypes.array,
  lists: PropTypes.array,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};

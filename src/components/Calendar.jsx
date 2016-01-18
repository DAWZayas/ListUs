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
            arrayObjectsDays.map( (task, index) =>  <li key={index}><span>You have to do the list </span> <Link to={`/list/${task[0].id}`}>{task[0].title}</Link> <span> with an importance of: {task[0].importance}</span></li>)
          }
        </ul>);
        tasks = false;
      }
    }

    if (tasks) {
      pendingTasks = 'Nothing planed for that day.';
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
              <div key={i}>
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
        <div>
          Selected: { this.state.selectedDay ? this.state.selectedDay.toLocaleDateString() : 'Select'}
          <br/><br/>
          Pending tasks: { this.state.selectedDay ? this.state.pendingTasks : 'Nothing selected'}
        </div>
      </div>
    );
  }

}

Calendar.propTypes = {
  calendar: PropTypes.object,
  lists: PropTypes.array,
  registerListeners: PropTypes.func.isRequired,
  unregisterListeners: PropTypes.func.isRequired
};

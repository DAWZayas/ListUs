import { connect } from 'react-redux';

import Calendar from '../components/Calendar';
import * as calendarActions from '../actions/calendar';

/*function mapStateToProps(state) {
  return {
  	calendar: state.calendar
  };
}

function mapActionsToProps(dispatch) {
  return {
  	dispatch
  };
}*/

export default connect(
	state => ({ calendar: state.calendar }),
	calendarActions
)(Calendar);
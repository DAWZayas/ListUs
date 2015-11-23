import { connect } from 'react-redux';
import { addDate } from '../actions';

import Calendar from '../components/Calendar';

function mapStateToProps(state) {
  return {
  	calendar: state.calendar
  };
}

function mapActionsToProps(dispatch) {
  return {
  	dispatch
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Calendar);
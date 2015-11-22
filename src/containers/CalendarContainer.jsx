import { connect } from 'react-redux';

import Calendar from '../components/Calendar';

function mapStateToProps(state) {
  return {
  	state
  };
}

function mapActionsToProps(dispatch) {
  return {
  	dispatch
  };
}

export default connect(
	mapActionsToProps,
	mapStateToProps
)(Calendar);
import React from 'react';
import { connect } from 'react-redux';

import Friends from '../components/Friends';

function mapStateToProps(state) {
  return {
  };
}

function mapActionsToProps(dispatch) {
  return {
  };
}

export default connect(
	mapActionsToProps,
	mapStateToProps
)(Friends);
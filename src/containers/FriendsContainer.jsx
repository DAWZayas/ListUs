import React from 'react';
import { connect } from 'react-redux';

import Friends from '../components/Friends';

function mapStateToProps(state) {
  	return {friends: state.friends};
}

function mapActionsToProps(dispatch) {
  return {
  	onAddFriend: name => dispatch(addFriend(name)),
    onRemoveFriend: id => dispatch(removeFriend(id))
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Friends);
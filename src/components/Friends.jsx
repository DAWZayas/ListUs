import React from 'react';
import { addFriend, removeFriend } from '../actions';
import { connect } from 'react-redux';

class Friends extends React.Component {
	render() {
		return (
			<article className='article'>
     			
     		<h3>Friends management</h3>
      		
      </article>
		);
	}
}

function mapStateToProps(state) {
  return {
  	friend: state.friend
  };
}

function mapActionsToProps(dispatch) {
  return {
  	onAddFriend: name => dispatch(addFriend(name)),
    onRemoveFriend: id => dispatch(removeFriend(id))
  };
}

export default connect(
	mapActionsToProps,
	mapStateToProps
)(Friends);
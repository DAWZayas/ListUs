import { connect } from 'react-redux';
import Friends from '../components/Friends';
//import { addFriend, removeFriend } from '../actions';
import * as friendsActions from '../actions/friends';

/*function mapStateToProps(state) {
  	return {friends: state.friends};
}

function mapActionsToProps(dispatch) {
  return {
  	onAddFriend: name => dispatch(addFriend(name)),
    	onRemoveFriend: id => dispatch(removeFriend(id))
  };
}*/

export default connect(
	state => ({ friends: state.friends }),
	friendsActions
)(Friends);

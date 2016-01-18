import { connect } from 'react-redux';
import Groups from '../components/Groups';
import { showGroupFriends } from '../actions';
import { addGroup, editGroup, removeGroup, addGroupFriend, removeGroupFriend, registerListeners, unregisterListeners, changeGroupAdmin } from '../actions/groups';

function mapStateToProps(state) {
  return {
  	groups: state.groups,
	friends: state.friends,
	//user: state.user
  };
}

function mapActionsToProps(dispatch) {
  return {
  		showGroupFriends: idGroup => dispatch(showGroupFriends(idGroup)),
		addGroup: (name, idUser) => dispatch(addGroup(name, idUser)),
		editGroup: (idGroup, name) => dispatch(editGroup(idGroup, name)),
		removeGroup: idGroup => dispatch(removeGroup(idGroup)),
		addGroupFriend: (idFriend, idGroup) => dispatch(addGroupFriend(idFriend, idGroup)),
		removeGroupFriend: (idFriend, idGroup) => dispatch(removeGroupFriend(idFriend, idGroup)),
		changeGroupAdmin: (idFriend, idGroup) => dispatch(changeGroupAdmin(idFriend, idGroup)),
		registerListeners: () => dispatch(registerListeners()),
		unregisterListeners: () => dispatch(unregisterListeners())
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps,
	//state => ({ groups: state.groups }),
	//groupsActions
)(Groups);
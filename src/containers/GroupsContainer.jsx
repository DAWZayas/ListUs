import { connect } from 'react-redux';
import Groups from '../components/Groups';
import { showGroupFriends, addGroupFriend, changeGroupAdmin, removeGroupFriend } from '../actions';
import { addGroup, editGroup, removeGroup, registerListeners, unregisterListeners } from '../actions/groups';
//import { registerListeners, unregisterListeners } from '../actions/groups';

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
		onAddGroupFriend: (idFriend, idGroup) => dispatch(addGroupFriend(idFriend, idGroup)),
		onRemoveGroupFriend: (idFriend, idGroup) => dispatch(removeGroupFriend(idFriend, idGroup)),
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
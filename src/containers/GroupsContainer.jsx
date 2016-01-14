import { connect } from 'react-redux';
import Groups from '../components/Groups';
import { editGroup, removeGroup, showGroupFriends, addGroupFriend, changeGroupAdmin, removeGroupFriend } from '../actions';
import { addGroup } from '../actions/groups';
import * as groupsActions from '../actions/groups';
//import { registerListeners, unregisterListeners } from '../actions/groups';

function mapStateToProps(state) {
  return {
  	groups: state.groups,
	//friends: state.friends,
	//user: state.user
  };
}

/*function mapActionsToProps(dispatch) {
  return {
  		onshowGroupFriends: idGroup => dispatch(showGroupFriends(idGroup)),
		onAddGroup: (name, idUser) => dispatch(addGroup(name, idUser)),
		onEditGroup: (idGroup, name) => dispatch(editGroup(idGroup, name)),
		onRemoveGroup: idGroup => dispatch(removeGroup(idGroup)),
		onAddGroupFriend: (idFriend, idGroup) => dispatch(addGroupFriend(idFriend, idGroup)),
		onRemoveGroupFriend: (idFriend, idGroup) => dispatch(removeGroupFriend(idFriend, idGroup)),
		onChangeGroupAdmin: (idFriend, idGroup) => dispatch(changeGroupAdmin(idFriend, idGroup)),
		registerListeners: () => dispatch(registerListeners()),
		unregisterListeners: () => dispatch(unregisterListeners())
  };
}*/

export default connect(
	mapStateToProps,
	//mapActionsToProps
	//state => ({ groups: state.groups }),
	groupsActions
)(Groups);
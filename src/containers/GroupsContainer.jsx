import { connect } from 'react-redux';
import Groups from '../components/Groups';
import { addGroup, editGroup, removeGroup, showGroupFriends, addGroupFriend, changeGroupAdmin } from '../actions';


function mapStateToProps(state) {
  return {
  	groups: state.groups,
	friends: state.friends,
	user: state.user
  };
}

function mapActionsToProps(dispatch) {
  return {
  		onshowGroupFriends: idGroup => dispatch(showGroupFriends(idGroup)),
		onAddGroup: (name, idUser) => dispatch(addGroup(name, idUser)),
		onEditGroup: (idGroup, name) => dispatch(editGroup(idGroup, name)),
		onRemoveGroup: idGroup => dispatch(removeGroup(idGroup)),
		onAddGroupFriend: (idFriend, idGroup) => dispatch(addGroupFriend(idFriend, idGroup)),
		onChangeGroupAdmin: (idFriend, idGroup) => dispatch(changeGroupAdmin(idFriend, idGroup))
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Groups);
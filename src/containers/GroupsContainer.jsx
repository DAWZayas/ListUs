import { connect } from 'react-redux';
import Groups from '../components/Groups';
import { addGroup, editGroup, removeGroup, showGroupFriends, addFriendGroup } from '../actions';


function mapStateToProps(state) {
  return {
  	groups: state.groups,
	friends: state.friends
  };
}

function mapActionsToProps(dispatch) {
  return {
  		onshowGroupFriends: idGroup => dispatch(showGroupFriends(idGroup)),
		onAddGroup: name => dispatch(addGroup(name)),
		onEditGroup: (idGroup, name) => dispatch(editGroup(idGroup, name)),
		onRemoveGroup: idGroup => dispatch(removeGroup(idGroup)),
		onAddFriendGroup: (idFriend, idGroup) => dispatch(addFriendGroup(idFriend, idGroup))
  };
}

export default connect(
	mapStateToProps,
	mapActionsToProps
)(Groups);
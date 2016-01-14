import { ADD_FRIEND_GROUP, REMOVE_FRIEND_GROUP } from '../actions';
import { arrayPositionByObjectKey } from '../utils/functions';
import { getId } from '../utils';
import { SET_GROUPS } from '../actions/groups';

function setGroups(state, groups){
	return groups.slice();
}

/*function addGroup(state, name, idUser){
	var newState = state.slice();
	return newState.concat(
		{
			id: getId(),
			name,
   			friends: [],
   			showFriends: false,
   			administrator: idUser
		}
	);
}*/

/*function editGroup(state, id, name){
	return state.map( group => group.id===id ? Object.assign( {}, group, {name}) : group );
}*/

//const removeGroup = (state, id) => state.slice().filter(group => group['id'] !== id);

/*function showGroupFriends(state, idGroup){
	return state.map(group => (group.id === idGroup)
				?(group.showFriends)
					? Object.assign({}, group, {'showFriends': false})
					: Object.assign({}, group, {'showFriends': true})
				: group
	);
}*/

function addGroupFriend(state, idFriend, id){
	var newState = state.slice();
	var friends = newState[arrayPositionByObjectKey('id', id, newState)]['friends'];
	if(friends.indexOf(idFriend) === -1) newState[arrayPositionByObjectKey('id', id, newState)]['friends'].push(idFriend);
	return newState;
}

function removeGroupFriend(state, idFriend, id){
	var newState = state.slice();
	return newState.map(group => (group.id === id) 
		?Object.assign({}, group, {friends: group.friends.filter(idF => idF !== idFriend)})
		:group);
}

/*function changeGroupAdmin(state, idFriend, idGroup){
	return state.map( group => (group.id === idGroup)? Object.assign({}, group, {'administrator': idFriend}): Object.assign({}, group));
}*/

export default function groupsReducer(state = [], action){
	switch(action.type){
		case SET_GROUPS:
			return setGroups(state, action.groups);
		/*case ADD_GROUP:
			return addGroup(state, action.name, action.idUser);*/
		/*case EDIT_GROUP:
			return editGroup(state, action.idGroup, action.name);*/
		/*case REMOVE_GROUP:
			return removeGroup(state, action.idGroup);*/
		/*case SHOW_GROUP_FRIENDS:
			return showGroupFriends(state, action.idGroup);*/
		case ADD_FRIEND_GROUP:
			return addGroupFriend(state, action.idFriend, action.idGroup);
		case REMOVE_FRIEND_GROUP:
			return removeGroupFriend(state, action.idFriend, action.idGroup);
		/*case CHANGE_GROUP_ADMIN:
			return changeGroupAdmin(state, action.idFriend, action.idGroup);*/
		default:
			return state;
	}
}

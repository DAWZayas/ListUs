import { SET_GROUPS, ADD_GROUP, REMOVE_GROUP, EDIT_GROUP, SHOW_GROUP_FRIENDS, ADD_FRIEND_GROUP, CHANGE_GROUP_ADMIN } from '../actions';
import { arrayPositionByObjectKey } from '../utils/functions';
import { getId } from '../utils';


function setGroups(state, groups){
	return groups.slice();
	
}

function addGroup(state, name, idUser){
	var newState = state.slice();
	return newState.concat(
		{
			idGroup: getId(),
			name, 
   			friends: [],
   			showFriends: false,
   			administrator: idUser
		}
	);
}

function editGroup(state, idGroup, name){
	//espachurra
	return state.map( group => group.idGroup===idGroup ? Object.assign( {}, group, {name}) : group );
}

const removeGroup = (state, idGroup) => state.slice().filter(group => group['idGroup'] !== idGroup);


function showGroupFriends(state, idGroup){
	var newState = state.slice();
	var showFriends = newState[arrayPositionByObjectKey('idGroup', idGroup, newState)]['showFriends'];
	newState[arrayPositionByObjectKey('idGroup', idGroup, newState)]['showFriends'] = (showFriends === true)?false :true;
	return newState;
}

function addGroupFriend(state, idFriend, idGroup){
	var newState = state.slice();
	var friends = newState[arrayPositionByObjectKey('idGroup', idGroup, newState)]['friends'];
	if(friends.indexOf(idFriend) === -1) newState[arrayPositionByObjectKey('idGroup', idGroup, newState)]['friends'].push(idFriend);
	return newState;
}

function changeGroupAdmin(state, idFriend, idGroup){
	var newState = state.slice();
	newState[arrayPositionByObjectKey('idGroup', idGroup, newState)]['administrator'] = idFriend;
	return newState;
}

export default function groupsReducer(state = [], action){
	switch(action.type){
		case SET_GROUPS:
			return setGroups(state, action.groups);
		case ADD_GROUP:
			return addGroup(state, action.name);
		case EDIT_GROUP:
			return editGroup(state, action.idGroup, action.name);
		case REMOVE_GROUP:
			return removeGroup(state, action.idGroup);
		case SHOW_GROUP_FRIENDS:
			return showGroupFriends(state, action.idGroup);
		case ADD_FRIEND_GROUP:
			return addGroupFriend(state, action.idFriend, action.idGroup);
		case CHANGE_GROUP_ADMIN:
			return changeGroupAdmin(state, action.idFriend, action.idGroup);
		default:
			return state;
	}
}
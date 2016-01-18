import { SHOW_GROUP_FRIENDS, ADD_FRIEND_GROUP, REMOVE_FRIEND_GROUP } from '../actions';
import { arrayPositionByObjectKey } from '../utils/functions';
import { SET_GROUPS } from '../actions/groups';

function setGroups(state, groups){
	return groups.slice();
}


function showGroupFriends(state, idGroup){
	return state.map(group => (group.id === idGroup)
				?(group.showFriends)
					? Object.assign({}, group, {'showFriends': false})
					: Object.assign({}, group, {'showFriends': true})
				: group
	);
}

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


export default function groupsReducer(state = [], action){
	switch(action.type){
		case SET_GROUPS:
			return setGroups(state, action.groups);
		case SHOW_GROUP_FRIENDS:
			return showGroupFriends(state, action.idGroup);
		case ADD_FRIEND_GROUP:
			return addGroupFriend(state, action.idFriend, action.idGroup);
		case REMOVE_FRIEND_GROUP:
			return removeGroupFriend(state, action.idFriend, action.idGroup);
		default:
			return state;
	}
}

import { SHOW_GROUP_FRIENDS } from '../actions';
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


export default function groupsReducer(state = [], action){
	switch(action.type){
		case SET_GROUPS:
			return setGroups(state, action.groups);
		case SHOW_GROUP_FRIENDS:
			return showGroupFriends(state, action.idGroup);
		default:
			return state;
	}
}

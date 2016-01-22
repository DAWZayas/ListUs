import { SET_USER } from '../actions/user';

function setUser(state, user){
	return Object.assign({}, user);
}

/*function switchUser(state, user){
	return Object.assign({}, user);
}


function changeUserPassword(state, password){
	return Object.assign({}, state, {password});
}

*/


export default function userReducer(state = {}, action){
	switch(action.type){
		case SET_USER:
			return setUser(state, action.user);
		/*case SWITCH_USER:
			return switchUser(state, action.user);
		case CHANGE_USER_PASSWORD:
			return changeUserPassword(state, action.password);*/
		default:
			return state;
		}
}
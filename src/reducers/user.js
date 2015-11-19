import { SWITCH_USER, CHANGE_USER_PHOTO, CHANGE_USER_NAME, CHANGE_USER_PASSWORD, CHANGE_USER_VISIBILITY } from '../actions';

function switchUser(state, user){
	return Object.assign({}, user);
}

function changeUserPhoto(state, url){
	return Object.assign({}, state, {'img': url});
}

function changeUserName(state, name){
	return Object.assign({}, state, {name});
}

function changeUserPassword(state, password){
	return Object.assign({}, state, {password});
}

function changeUserVisibility(state, visibility){
	return Object.assign({}, state, {visibility});
}


export default function userReducer(state = {}, action){
	switch(action.type){
		case SWITCH_USER:
			return switchUser(state, action.user);
		case CHANGE_USER_PHOTO:
			return changeUserPhoto(state, action.url);
		case CHANGE_USER_NAME:
			return changeUserName(state, action.name);
		case CHANGE_USER_PASSWORD:
			return changeUserPassword(state, action.password);
		case CHANGE_USER_VISIBILITY:
			return changeUserVisibility(state, action.visibility);
		default:
			return state;
		}
}
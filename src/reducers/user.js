import { CHANGE_USER_PHOTO } from '../actions';

function changeUserPhoto(state, url){
	/*var o = Object.assign({}, state).img = url;
	return Object.assign({}, o);*/
	return Object.assign({}, state, {'img': url});
}

function changeUserName(state, name){
	
}


export default function userReducer(state = {}, action){
	switch(action.type){
		case CHANGE_USER_PHOTO:
			return changeUserPhoto(state, action.url);
		default:
			return state;
		}
}
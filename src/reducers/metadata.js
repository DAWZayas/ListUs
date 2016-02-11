
import { SET_METADATA } from '../actions';

function setMetadata(state, metadata){
	return Object.assign({}, metadata);
}


export default function metadataReducers(state = {}, action){
	switch(action.type){
		case SET_METADATA:
			return setMetadata(state, action.metadata);
		default:
			return state;
	}
}
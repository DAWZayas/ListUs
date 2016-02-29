
import { SET_METADATA, END_GREET } from '../actions';

function setMetadata(state, metadata){
	return Object.assign({}, metadata);
}

function endGreet(state){
	return Object.assign(state.metadata, {greet: ''});
}


export default function metadataReducers(state = {}, action){
	switch(action.type){
		case SET_METADATA:
			return setMetadata(state, action.metadata);
		case END_GREET:
			return endGreet(state);
		default:
			return state;
	}
}
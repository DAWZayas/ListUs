import { ADD_FRIEND, REMOVE_FRIEND } from '../actions';
import {getId} from '../utils';

function addFriend(state, name){
  const id = getId();
  const newFriend = {id, name, groups: []};
  return state.concat(newFriend);
}

function removeFriend(state, idFriend){
  return state.filter( friend => friend.id!==idFriend);
}


export default function friendReduce(state = [], action){
  switch (action.type) {
    case ADD_FRIEND:
      return addFriend(state, action.name);
    case REMOVE_FRIEND:
      return removeFriend(state, action.id);
    default:
      return state;
  }
}

import { SET_FRIENDS, ADD_FRIEND, REMOVE_FRIEND, ADD_FRIEND_GROUP } from '../actions';
import {getId} from '../utils';

function setFriends(state, friends){
  return friends.slice();
}

function addFriend(state, name){
  const id = getId();
  const newFriend = {id, name, groups:[], img:''};

  return state.concat(newFriend);
}

function removeFriend(state, idFriend){
  return state.filter( friend => friend.id!==idFriend);
}

function addFriendGroup(state, idGroup, idFriend){
  return state.map( friend => friend.id===idFriend ? Object.assign({}, friend, {groups:friend.groups.concat(idGroup)}) : friend );
}

export default function friendReduce(state = [], action){
  switch (action.type) {
    case SET_FRIENDS:
      return setFriends(state, action.friends);
    case ADD_FRIEND:
      return addFriend(state, action.name);
    case REMOVE_FRIEND:
      return removeFriend(state, action.id);
    case ADD_FRIEND_GROUP:
      return addFriendGroup(state, action.idGroup, action.idFriend);
    default:
      return state;
  }
}

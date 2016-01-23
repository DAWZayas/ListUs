import { ADD_FRIEND_GROUP } from '../actions';
import { SET_FRIENDS, NO_FRIEND_FOUND, SET_USERS } from '../actions/friends';

function setFriends(state, friends, users){
  debugger;
  return {
    friends,
    users
  }
}

function noFriendFound(state, friend){
  return friend;
}

function setAllUsers(state, users){
  return users.slice();
}


function addFriendGroup(state, idGroup, idFriend){
  return state.map( friend => friend.id===idFriend ? Object.assign({}, friend, {groups:friend.groups.concat(idGroup)}) : friend );
}

export default function friendReduce(state = [], action){
  switch (action.type) {
    case SET_FRIENDS:
      return setFriends(state, action.friends, action.users);
    case ADD_FRIEND_GROUP:
      return addFriendGroup(state, action.idGroup, action.idFriend);
    case NO_FRIEND_FOUND:
      return noFriendFound(state, action.payload);
    case SET_USERS:
      return setAllUsers(state, action.users);
    default:
      return state;
  }
}

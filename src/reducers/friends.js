import { ADD_FRIEND_GROUP } from '../actions';
import { SET_FRIENDS } from '../actions/friends';

function setFriends(state, friends){
  return friends.slice();
}


function addFriendGroup(state, idGroup, idFriend){
  return state.map( friend => friend.id===idFriend ? Object.assign({}, friend, {groups:friend.groups.concat(idGroup)}) : friend );
}

export default function friendReduce(state = [], action){
  switch (action.type) {
    case SET_FRIENDS:
      return setFriends(state, action.friends);
    case ADD_FRIEND_GROUP:
      return addFriendGroup(state, action.idGroup, action.idFriend);
    default:
      return state;
  }
}


import { pushState } from 'redux-router';
import sequencer from './sequencer';

/*
* LIST
*/

export const EDIT_LIST = 'EDIT_LIST';
export const ADD_FRIEND_OR_GROUP_TO_LIST = 'ADD_FRIEND_OR_GROUP_TO_LIST';
export const REMOVE_FRIEND_OR_GROUP_TO_LIST = 'REMOVE_FRIEND_OR_GROUP_TO_LIST';


/*
* DISPLAY ASIDE
*/

export const DISPLAY_ASIDE = 'DISPLAY_ASIDE';

/*
* DISPLAY CALENDAR
*/

export const DISPLAY_CALENDAR = 'DISPLAY_CALENDAR';

/*
* COMMENT
*/

export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENTS = 'REMOVE_COMMENTS';

/*
* FRIENDS
*/

export const SET_FRIENDS = 'SET_FRIENDS';
export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const ADD_FRIEND_GROUP = 'ADD_FRIEND_GROUP';
export const REMOVE_FRIEND_GROUP = 'REMOVE_FRIEND_GROUP';

/*
* GROUPS
*/
export const SHOW_GROUP_FRIENDS = 'SHOW_GROUP_FRIENDS';


/*
  CALENDAR
*/

export const ADD_DATE = 'ADD_DATE';

/*
  METADATA
*/

export const SET_METADATA = 'SET_METADATA';
export const END_GREET = 'END_GREET';

/*
* list action creator
*/


export function editList( idList, title, date, newDate, importance ){
  return { type: EDIT_LIST, idList, title, date, newDate, importance };
}
export function addFriendGroupToList(idList, id){
  return { type: ADD_FRIEND_OR_GROUP_TO_LIST, idList, id};
}
export function removeFriendGroupToList(idList, idPaticipant){
  return { type: REMOVE_FRIEND_OR_GROUP_TO_LIST, idList, idPaticipant};
}
export function removeListAndNavigate(idList, title, date) {
  return dispatch => sequencer([
      () => dispatch(removeList(idList, title, date)),
      () => dispatch(pushState(null, '/'))
    ]);
}


/*
* comment action creator
*/

export function addComment(idList, user, date, hour, msg){
  return { type: ADD_COMMENT, idList, user, date, hour, msg};
}
export function removeComments(idList){
  return { type: REMOVE_COMMENTS, idList};
}

/*
* friends actions creator
*/

export function setFriends(friends){
  return {
    type: SET_FRIENDS, friends
  };
}

export function addFriend(name){
  return { type: ADD_FRIEND, name};
}
export function removeFriend(id){
  return { type: REMOVE_FRIEND, id};
}

export function addFriendGroup(idGroup, idFriend){
  return { type: ADD_FRIEND_GROUP, idGroup, idFriend };
}

/*
* groups actions creator
*/

export function showGroupFriends(idGroup, idFriend){
  return { type: SHOW_GROUP_FRIENDS, idGroup, idFriend };
}


/*
  CALENDAR
*/

export function addDate(){
  return {
    type: ADD_DATE
  };
}

/*
  METADATA
*/

export function setMetadata(metadata){
  return {
    type: SET_METADATA,
    metadata
  };
}

export function endGreet(){
  return {
    type: END_GREET
  };
}

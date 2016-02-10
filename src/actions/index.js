
import { pushState } from 'redux-router';
import sequencer from './sequencer';

/*
* TASK


export const SET_TASK = 'SET_TASK';
export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const EDIT_TASK = 'EDIT_TASK';
export const ADD_FRIEND_OR_GROUP_TO_TASK = 'ADD_FRIEND_OR_GROUP_TO_TASK';
export const SET_AS_DONE = 'SET_AS_DONE';*/
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
* USER ACOUNT
*/

/*export const SWITCH_USER = 'SWITCH_USER';
export const CHANGE_USER_PHOTO = 'CHANGE_USER_PHOTO';
export const CHANGE_USER_NAME = 'CHANGE_USER_NAME';
export const CHANGE_USER_PASSWORD = 'CHANGE_USER_PASSWORD';
export const CHANGE_USER_VISIBILITY = 'CHANGE_USER_VISIBILITY';*/

/*
  CALENDAR
*/

export const ADD_DATE = 'ADD_DATE';

/*
  METADATA
*/

export const SET_METADATA = 'SET_METADATA';
/*
* task action creator ***************************************************************


export function setTask(task){
  return { type: SET_TASK, task };
}
export function addTask(idList, title){
  return { type: ADD_TASK, idList, title };
}
export function removeTask(idTask){
  return { type: REMOVE_TASK, idTask };
}
export function editTask( idTask, title ){
  return { type: EDIT_TASK, idTask, title };
}
export function addFriendGroupToTask(idTask, id){
  return { type: ADD_FRIEND_OR_GROUP_TO_TASK, idTask, id};
}
export function setAsDone(idTask){
    return { type: SET_ASS_DONE, idTask};
}
*/
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
* User actions creator
*/

/*export function switchUser(user){
  return {
    type: SWITCH_USER, user
  };
}

export function changeUserPhoto(url){
  return {
    type: CHANGE_USER_PHOTO, url
  };
}

export function changeUserName(name){
  return {
    type: CHANGE_USER_NAME, name
  };
}

export function changeUserPassword(password){
  return {
    type: CHANGE_USER_PASSWORD, password
  };
}

export function changeUserVisibility(visibility){
  return {
    type: CHANGE_USER_VISIBILITY, visibility
  };
}*/

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

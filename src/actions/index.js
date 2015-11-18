/*
* TASK
*/

export const ADD_TASK = 'ADD_TASK';
export const SET_TASK = 'SET_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const EDIT_TASK = 'EDIT_TASK';

/*
* LIST
*/

export const SET_LIST = 'SET_LIST';
export const ADD_LIST = 'ADD_LIST';
export const REMOVE_LIST = 'REMOVE_LIST';
export const EDIT_LIST = 'EDIT_LIST';

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

export const ADD_FRIEND = 'ADD_FRIEND';
export const REMOVE_FRIEND = 'REMOVE_FRIEND';
export const ADD_FRIEND_GROUP = 'ADD_FRIEND_GROUP';

/*
* GROUPS
*/

export const SET_GROUPS = 'SET_GROUPS';
export const ADD_GROUP = 'ADD_GROUP';
export const REMOVE_GROUP = 'REMOVE_GROUP';
export const EDIT_GROUP = 'EDIT_GROUP';
export const SHOW_GROUP_FRIENDS = 'SHOW_GROUP_FRIENDS';
export const CHANGE_GROUP_ADMIN = 'CHANGE_GROUP_ADMIN';



/*
* USER ACOUNT
*/

export const CHANGE_USER_PHOTO = 'CHANGE_USER_PHOTO';


/*
* task action creator ***************************************************************
*/

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

/*
* list action creator
*/

export function setList(list){
  return { type: SET_LIST, list};
}
export function addList(title){
  return { type: ADD_LIST, title };
}
export function removeList(idList){
  return { type: REMOVE_LIST, idList };
}
export function editList( idList, title ){
  return { type: EDIT_LIST, idList, title };
}

/*
* visibility aside action creator
*/

export function displayAside(display){
  return { type: DISPLAY_ASIDE, display };
}

/*
* visibility calendar action creator
*/

export function displayCalendar(display){
  return { type: DISPLAY_CALENDAR, display };
}


/*
* comment action creator
*/

export function addComment(idList, user, date, msg){
  return { type: ADD_COMMENT, idList, user, date, msg};
}
export function removeComments(idList){
  return { type: REMOVE_COMMENTS, idList};
}

/*
* friends actions creator
*/

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

export function setGroups(groups){
  return {
    type: SET_GROUPS, groups
  };
}


export function addGroup(name){
  return {
    type: ADD_GROUP, name
  };
}

export function removeGroup(idGroup){
  return {
    type: REMOVE_GROUP, idGroup
  };
}

export function editGroup(idGroup, name){
  return {
    type: EDIT_GROUP, idGroup, name
  };
}

export function showGroupFriends(idGroup){
  return {
    type: SHOW_GROUP_FRIENDS, idGroup
  };
}

export function addGroupFriend(idFriend, idGroup){
  return {
    type: ADD_FRIEND_GROUP, idFriend, idGroup
  };
}

export function changeGroupAdmin(idFriend, idGroup){
  return {
    type: CHANGE_GROUP_ADMIN, idFriend, idGroup
  };
}

/*
* User actions creator
*/

export function changeUserPhoto(url){
  return {
    type: CHANGE_USER_PHOTO, url
  };
}
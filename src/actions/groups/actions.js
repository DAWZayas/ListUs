import { SET_GROUPS, ADD_GROUP_ERROR, REMOVE_GROUP_ERROR } from './action-types';

export function setGroups(groups){
  return { type: SET_GROUPS, groups };
}

export function addGroup(name){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('groups').push({name, showFriends: false,
       administrator: '0', friends: []
     }, error => {
        if(error){
          console.error('ERROR @ addGroup:', error);
          dispatch({
            type: ADD_GROUP_ERROR,
            payload: error,
        });
        }
    });
  };
}

export function removeGroup(id){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('groups').child(id).remove(
     error => {
        if(error){
          console.error('ERROR @ removeGroup:', error);
          dispatch({
            type: REMOVE_GROUP_ERROR,
            payload: error,
        });
        }
    });
  };
}

export function editGroup(id, name){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('groups').child(id).child('name').set(name,
     error => {
        if(error){
          console.error('ERROR @ editGroup:', error);
          dispatch({
            type: EDIT_GROUP_ERROR,
            payload: error,
        });
        }
    });
  };
}


import { SET_GROUPS, ADD_GROUP_ERROR, REMOVE_GROUP_ERROR } from './action-types';

export function setGroups(groups){
  return { type: SET_GROUPS, groups };
}

export function addGroup(name){
  return (dispatch, getState) => {
    const { firebase } = getState();
    //debugger;
    firebase.child('groups').push({name, showFriends: false
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

/*export function removeGroup(id){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('groups').push({name, showFriends: false
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
}*/


//const removeGroup = (state, id) => state.slice().filter(group => group['id'] !== id);

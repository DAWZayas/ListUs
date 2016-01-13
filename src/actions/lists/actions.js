import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR } from './action-types';

export function setList(lists){

  return { type: SET_LIST, lists};
}

export function addList(title, date, importance){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('lists').push({title, date, importance, participants:[]}, error => {
        if(error){
          console.error('ERROR @ addList:', error);
          dispatch({
            type: ADD_LIST_ERROR,
            payload: error
          });
        }
    });
  };
}

export function removeList(idList, title, date){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`lists/${idList}`).remove(error => {
      if(error){
        console.error('ERROR @ removeList:', error);
        dispatch({
          type: REMOVE_LIST_ERROR,
          payload: error
        });
      }
    });
  };
}

export function editList(idList, title, date, newDate, importance){
  debugger;
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child(`lists/${idList}`).set({ title, date:newDate, importance });
  };
}

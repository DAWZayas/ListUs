import { SET_USER, CHANGE_IMG_ERROR, CHANGE_NAME_ERROR, CHANGE_VISIBILITY_ERROR } from './action-types';

export function setUser(user){
  return { type: SET_USER, user };
}


export function changeImg(url){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}/img`).set(url, error => {
        if(error){
          console.error('ERROR @ changeImg:', error);
          dispatch({
            type: CHANGE_IMG_ERROR,
            payload: error,
        });
        }
    });
  };
}

export function changeName(name){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}/name`).set(name, error => {
        if(error){
          console.error('ERROR @ changeName:', error);
          dispatch({
            type: CHANGE_NAME_ERROR,
            payload: error,
        });
        }
    });
  };
}

export function changeVisibility(visibility){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}/visibility`).set(visibility, error => {
        if(error){
          console.error('ERROR @ changeVisibility:', error);
          dispatch({
            type: CHANGE_VISIBILITY_ERROR,
            payload: error,
        });
        }
    });
  };
}


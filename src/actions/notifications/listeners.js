import { SET_NOTIFICATIONS } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    firebase.child(`users/${auth.id}/pendingActions`).on('value', snapshot => {
      dispatch({
        type: SET_NOTIFICATIONS,
        pendingActions: snapshot.val()!==null ? Object.values(snapshot.val()) : []
      });
    });
  };
}


export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}/pendingActions`).off();
    dispatch({
      type: SET_NOTIFICATIONS,
      pendingActions: []
    });
  };
}

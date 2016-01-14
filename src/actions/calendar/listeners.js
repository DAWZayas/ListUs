import { SET_CALENDAR } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('calendar');

    ref.on('value', snapshot => {dispatch({
      type: SET_CALENDAR,
      calendar: snapshot.val()
    })});
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('friends');
    ref.off();
    dispatch({
      type: SET_CALENDAR,
      friends: []
    });
  };
}

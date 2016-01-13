import { SET_LIST } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('lists');

    ref.on('value', snapshot => dispatch({
      type: SET_LIST,
      lists: Object.keys(snapshot.val() || []).map( id => ({id, title:snapshot.val()[id].title}))
    }));
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('lists');
    ref.off();
    dispatch({
      type: SET_LIST,
      lists: []
    });
  };
}

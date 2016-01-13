import { SET_LIST } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('lists');

    ref.on('value', snapshot => {dispatch({
      type: SET_LIST,
      lists: Object.keys(snapshot.val() || []).reduce( (init, id) =>
        init.concat({id, title:snapshot.val()[id].title, importance:snapshot.val()[id].importance, date:snapshot.val()[id].date, participants:snapshot.val()[id].participants}), [])
    })});
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

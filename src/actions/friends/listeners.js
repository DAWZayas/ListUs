import { SET_FRIENDS } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('friends');

    ref.on('value', snapshot => {dispatch({
      type: SET_FRIENDS,
      friends: Object.keys(snapshot.val() || []).reduce( (init, id) => init.concat({id, groups:snapshot.val()[id].groups, img:snapshot.val()[id].img, name:snapshot.val()[id].name}), [])
    });});
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const ref = firebase.child('friends');
    ref.off();
    dispatch({
      type: SET_FRIENDS,
      friends: []
    });
  };
}

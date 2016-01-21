import { SET_FRIENDS } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`users/${auth.id}/friends`);
    const refGlobal = firebase.child('friends');

    let friends;

    ref.once('value', snapshot => {
      friends = snapshot.val() === null ? [] : snapshot.val();
      refGlobal.on('value', snapshot => {dispatch({
        type: SET_FRIENDS,
        friends: Object.keys(snapshot.val() || []).reduce( (init, id) => friends.indexOf(id) !== -1 ? init.concat({id, groups:snapshot.val()[id].groups, img:snapshot.val()[id].img, name:snapshot.val()[id].name}) : init, [])
      });
    });
  });

  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`users/${auth.id}/friends`);
    ref.off();
    dispatch({
      type: SET_FRIENDS,
      friends: []
    });
  };
}

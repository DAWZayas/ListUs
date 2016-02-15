import { SET_FRIENDS, SET_USERS } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {

    const { firebase, auth } = getState();
    const ref = firebase.child(`users/${auth.id}/friends`);
    const refGlobal = firebase.root();

    let friends = [];

    ref.on('value', snapshot => {
      friends = snapshot.val() === null ? [] : snapshot.val();

      refGlobal.once('value', snapshot => {
        let friendsToIterate = snapshot.val().users[auth.id].friends === undefined ? [] : snapshot.val().users[auth.id].friends.filter(Boolean);
        let usersToIterate = Object.keys(snapshot.val().users || {}).filter(id => snapshot.val().users[auth.id].accounts.indexOf(id) === -1 && friendsToIterate.indexOf(snapshot.val().users[id].name) === -1);
        //snapshot.val().users[snapshot.val().users[auth.id].accounts[0]]
        dispatch({
          type: SET_FRIENDS,
          friends: Object.values(snapshot.val().users || {}).reduce( (init, user) => friends.indexOf(user.name) !== -1
              ? init.concat({user, groups:user.groups, img:user.img, name:user.name})
              : init, []),
          users: usersToIterate.reduce( (init, id) => (auth.id !== id && snapshot.val().users[id].visibility)
              ? init.concat({id, img:snapshot.val().users[id].img, name:snapshot.val().users[id].name})
              : init, [])
        });
    });
  });
  };
}

export function unregisterListeners(){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const ref = firebase.child(`users/${auth.id}/friends`);
    const usersRef = firebase.child('users');
    usersRef.off();
    ref.off();
    dispatch({
      type: SET_FRIENDS,
      friends: []
    });
    dispatch({
      type: SET_USERS,
      users: []
    });
  };
}

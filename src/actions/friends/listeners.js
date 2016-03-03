import { SET_FRIENDS, SET_USERS, CLEAN_ALERT, SET_ALERT } from './action-types';

export function registerListeners(){
  return (dispatch, getState) => {

    const { firebase, auth } = getState();
    const ref = firebase.child(`users/${auth.id}/friends`);
    const refGlobal = firebase.root();

    let friends = [];

    ref.on('value', snapshot => {
      friends = snapshot.val() === null ? [] : snapshot.val();

      refGlobal.once('value', snapshot => {
        let arrActualFriends = snapshot.val().users[auth.id].friends === undefined ? [] : snapshot.val().users[auth.id].friends.filter(Boolean);
        if(snapshot.val().users[auth.id].accounts !== undefined){
          Object.keys(snapshot.val().users[auth.id].accounts).reduce( (init, id) => arrActualFriends = arrActualFriends.concat(snapshot.val().users[snapshot.val().users[auth.id].accounts[id]].name), arrActualFriends);
        }
        arrActualFriends = arrActualFriends.filter(Boolean);
        //Object.keys(snapshot.val().users || {}).filter(id => snapshot.val().users[auth.id].accounts !== undefined ? snapshot.val().users[auth.id].accounts.indexOf(id) === -1 && friendsToIterate.indexOf(snapshot.val().users[id].name) === -1 : true);
        let usersToIterate = Object.keys(snapshot.val().users || {}).filter( id => arrActualFriends.indexOf(snapshot.val().users[id].name) === -1);
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

    firebase.child(`users/${auth.id}`).on('child_changed', (newSnapshot, oldSnapshot) => {
      let newUserName = '';
      if(newSnapshot.length>oldSnapshot.length){
        newUserName = newSnapshot.filter( name => oldSnapshot.indexOf(name)===-1 )[0].toUpperCase();
      }else{
        newUserName = oldSnapshot.filter( name => newSnapshot.indexOf(name)===-1 )[0].toUpperCase();
      }
      dispatch({
        type: SET_ALERT,
        msg: `${newUserName} added you as friend`,
        msgType: 'add'
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
    dispatch({
      type: CLEAN_ALERT
    });
  };
}

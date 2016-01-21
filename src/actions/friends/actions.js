import { SET_FRIENDS, ADD_FRIENDS_ERROR, REMOVE_FRIENDS_ERROR } from './action-types';

export function setFriends(friends){
  return { type: SET_FRIENDS, friends};
}

export function addFriend(name){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    const idFire = firebase.child('friends').push({name, groups:'', img:'' }, error => {
        if(error){
          console.error('ERROR @ addFriend:', error);
          dispatch({
            type: ADD_FRIENDS_ERROR,
            payload: error,
        });
      }else{
        const reference = firebase.child(`users/${auth.id}/friends`);
        const refUser = firebase.child(`users/${auth.id}`);
        let friends = [];
        const idFriend = idFire.key();
        reference.once('value', snapshot => {
          friends = snapshot.val() === null ? [idFriend] : snapshot.val().concat([idFriend]);
          refUser.update({friends});
      });
      }
    });
  };
}

export function removeFriend(id){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`friends/${id}`).remove( error => {
        if(error){
          console.error('ERROR @ removeFriend:', error);
          dispatch({
            type: REMOVE_FRIENDS_ERROR,
            payload: error,
        });
      }else{
        const reference = firebase.child(`users/${auth.id}/friends`);
        const refUser = firebase.child(`users/${auth.id}`);
        let friends = [];
        reference.once('value', snapshot => {
          friends = snapshot.val() === null ? [] : snapshot.val().filter(friend => id !== friend);
          refUser.update({friends});
      });
      }
    });
  };
}

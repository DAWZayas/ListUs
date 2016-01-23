import { SET_FRIENDS, ADD_FRIENDS_ERROR, REMOVE_FRIENDS_ERROR, NO_FRIEND_FOUND, SET_USERS } from './action-types';

export function setFriends(friends){
  return { type: SET_FRIENDS, friends};
}

export function setUsers(users){
  return { type: SET_USERS, users};
}

export function addFriend(name){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    const friendsReference = firebase.child('friends');
    const usersReference = firebase.child('users');

    usersReference.once('value', snapshot => {
      if(Object.keys(snapshot.val()).filter( friend => snapshot.val()[friend].name === name).length > 0){
        const idFire = friendsReference.push({name, groups:'', img:'' }, error => {
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
            debugger;
            const idFriend = idFire.key();
            //OSCAR TE HE CAMBIADO idFriend PORQUE name TENÍAS PARA QUE AÑADA EL NOMBRE EN VEZ DEL ID ESE RARO
            reference.once('value', snapshot => {
              let friends;

              if(snapshot.val() === null){
                friends = [name];
              }else{
                friends = snapshot.val().concat([name]);
              }

              refUser.update({friends});
          });
          }
        });
      }else{
        console.error('ERROR @ noFriendFound');
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

import { SET_FRIENDS, REMOVE_FRIENDS_ERROR,  SET_USERS, ADD_FRIEND, CLEAN_ALERT, SET_ALERT } from './action-types';
import { getActualDate } from '../../utils/functions';

export function setFriends(friends){
  return { type: SET_FRIENDS, friends};
}

export function setUsers(users){
  return { type: SET_USERS, users};
}

export function addFriend(name){
  return (dispatch, getState) => {
    new Promise(resolve => {
      const { firebase, auth } = getState();
        firebase.child('users').once('value', snapshot => {
          resolve(
            function(){
              new Promise(resolve => {
                resolve(Object.keys(snapshot.val()).filter( idUser => snapshot.val()[idUser].name===name )[0]);
              }).then( idFriend  => {
                firebase.child(`users/${auth.id}`).once('value', snapshot => {
                  sendActionPendingToUser(snapshot.val().name, auth.id, firebase, idFriend);
                });
              });
            }
          );
        });
    }).then( () => {
      dispatch({
        type: SET_ALERT,
        msg: 'Request was sent',
        msgType: 'add'
      });
    });
  };
}

function sendActionPendingToUser(nameUserCreateAction, idUserCreateAction, firebase, idFriend){
  firebase.child(`users/${idFriend}`).once('value', userSnapshot => {
    //CREAR LA ACCION PENDING
    const descr = nameUserCreateAction + ' wants to add you to friend';
    const date = getActualDate();
    const newPendingActions = {
      type: ADD_FRIEND,
      idUser: idUserCreateAction,
      name: nameUserCreateAction,
      descr,
      date
    };
    const pendingActions = userSnapshot.val().pendingActions !== undefined ?
      userSnapshot.val().pendingActions.concat(newPendingActions) : [newPendingActions];
    firebase.child(`users/${idFriend}`).update({pendingActions});
  });
}


export function removeFriend(name){
  return (dispatch, getState) => {
    new Promise(resolve => {
      const { firebase, auth } = getState();
      firebase.child(`friends/${name}`).remove( error => {
          if(error){
            console.error('ERROR @ removeFriend:', error);
            dispatch({
              type: REMOVE_FRIENDS_ERROR,
              payload: error
            });
          }else{
            const reference = firebase.child(`users/${auth.id}/friends`);
            const refUser = firebase.child(`users/${auth.id}`);
            let friends = [];
            reference.once('value', snapshot => {
              friends = snapshot.val() === null ? [] : snapshot.val().filter(friend => name !== friend);
              resolve(refUser.update({friends}));
            });
          }
      });
    }).then( () => {
      dispatch({
        type: SET_ALERT,
        msg: 'Remove friend',
        msgType: 'remove'
      });
    });

  };
}

export function cleanAlert(){
  return (dispatch) => {
    dispatch({
      type: CLEAN_ALERT
    });
  };
}

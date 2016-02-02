import { SET_NOTIFICATIONS, ADD_FRIEND_TO_LIST, ADD_FRIEND_GROUP } from './action-types';

export function setNotifications(notifications){
  return { type: SET_NOTIFICATIONS, notifications };
}

export function aceptPendingAction(notification){
  switch (notification.type) {
    case ADD_FRIEND_TO_LIST:
      return addMeToList(notification.idList);
    case ADD_FRIEND_GROUP:
      return addGroupFriend(notification.friendName, notification.idGroup);
    default:
      return '';
  }
}

export function refusePendingAction(notification){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`users/${auth.id}`).once('value', snapshotUser => {
      //borrar la pendingAction
      const pendingActions = Object.values(snapshotUser.val().pendingActions).filter( actionPending => actionPending.idList!==notification.idList );
      firebase.child(`users/${auth.id}`).update({pendingActions});
    });
  };
}


function addMeToList(idList){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refIdList = firebase.child(`lists/${idList}`);

    //añadir la lista al usuario
    firebase.child(`users/${auth.id}`).once('value', snapshotUser => {
      const name = snapshotUser.val().name;
      const lists = snapshotUser.val().lists===undefined ? [idList] : snapshotUser.val().lists.concat(idList);
      firebase.child(`users/${auth.id}`).update({lists});

      //añadir a la lista el nombre del usuario
      firebase.child(`lists/${idList}/participantsFriends`).once('value', snapshot => {
        const participantsFriends = snapshot.val()===null ? [name] : snapshot.val().concat([name]);
        refIdList.update({participantsFriends});
      });

      //borrar la pendingAction
      const pendingActions = Object.values(snapshotUser.val().pendingActions).filter( actionPending => actionPending.idList!==idList );
      firebase.child(`users/${auth.id}`).update({pendingActions});
    });
  };
}


export function addGroupFriend(friendName, idGroup){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    new Promise( resolve => {
      firebase.child(`groups/${idGroup}/friends`).once('value', snapshot => resolve(snapshot.val() || []));
    }).then( val => {
      if(val.indexOf(friendName) === -1){
        val.push(friendName);
        firebase.child(`groups/${idGroup}/friends`).set(val,
         error => {
            if(error){
              console.error('ERROR @ addGroupFriend:', error);
              dispatch({
                type: ADD_FRIEND_GROUP_ERROR,
                payload: error,
            });
            }
        });
      }}
    ).then(
        () => firebase.child(`users/${auth.id}`).update({refresh: ''})).then(
        () => firebase.child(`users/${auth.id}/refresh`).remove()
    );

    firebase.child('users').once('value', snap => {
        Object.keys(snapshot.val()).map(idUser => {
          if(snapshot.val()[idUser].name === friendName){
            const groups = (snapshot.val()[idUser].groups) 
                ? snapshot.val()[idUser].groups.concat(idGroup)
                : [idGroup];
            firebase.child(`users/${idUser}/groups`).set(groups);
          }
        });
    });
  };
}



import { SET_NOTIFICATIONS, ADD_FRIEND_TO_LIST } from './action-types';

export function setNotifications(notifications){
  return { type: SET_NOTIFICATIONS, notifications };
}

export function aceptPendingAction(notification){
  switch (notification.type) {
    case ADD_FRIEND_TO_LIST:
      return addMeToList(notification.idList);
    default:
      return '';
  }
}


function addMeToList(idList){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const refParticipants = firebase.child(`users/${auth.id}/lists/${idList}/participants`);
    const refIdList = firebase.child(`lists/${idList}`);

    //añadir la lista al usuario
    let participants = [];
    firebase.child(`users/${auth.id}`).once('value', snapshotUser => {
      const name = snapshotUser.val().name;
      const lists = snapshotUser.val().lists===undefined ? [idList] : snapshotUser.val().lists.concat(idList);
      firebase.child(`users/${auth.id}`).update({lists});

      //añadir a la lista el nombre del usuario
      refParticipants.once('value', snapshot => {
        participants = snapshot.val()===null ? [name] : snapshot.val().concat([name]);
        refIdList.update({participants});
      });

      //borrar la pendingAction
      const pendingActions = Object.values(snapshotUser.val().pendingActions).filter( actionPending => actionPending.idList!==idList );
      firebase.child(`users/${auth.id}`).update({pendingActions});
    });


  };
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

import { SET_NOTIFICATIONS, ADD_FRIEND_TO_LIST, ADD_FRIEND_GROUP, ADD_FRIEND } from './action-types';

export function setNotifications(notifications){
  return { type: SET_NOTIFICATIONS, notifications };
}

export function aceptPendingAction(notification){
  switch (notification.type) {
    case ADD_FRIEND_TO_LIST:
      return addMeToList(notification);
    case ADD_FRIEND_GROUP:
      return addGroupFriend(notification.friendName, notification.idGroup);
    case ADD_FRIEND:
      return addFriend(notification);
    default:
      return '';
  }
}

export function refusePendingAction(notification){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    deleteDuplicatesActionPendings(firebase, auth, notification);
  };
}



const convertDay = date => date.split('/')[0][0]==='0' ? date.split('/')[0][1] : date.split('/')[0];
const convertMonth = date => date.split('/')[1][0]==='0' ? date.split('/')[1][1] : date.split('/')[1];

const months = [ '', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];

function addToCalendar(firebase, auth, idList, date){
  // get day
  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];

  const refDate = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
    refMonth.update({[dayNumber]:listsInDay});
  });
}


function addMeToList(notification){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const idList = notification.idList;
    new Promise(resolve => {
      firebase.child(`users/${auth.id}`).once('value', snapshotUser => {
        const name = snapshotUser.val().name;
        const lists = snapshotUser.val().lists===undefined ? [idList] : snapshotUser.val().lists.concat(idList);
        firebase.child(`users/${auth.id}`).update({lists});
        addListToCalendar(firebase, auth, idList);
        resolve(name);
      });
    }).then( (name) => {
      addUserToList(firebase, idList, name);
    }).then( () => {
      deleteDuplicatesActionPendings(firebase, auth, notification);
    });
  };
}

function addUserToList(firebase, idList, name){
  firebase.child(`lists/${idList}/participantsFriends`).once('value', snapshot => {
    const participantsFriends = snapshot.val()===null ? [name] : snapshot.val().concat([name]);
    refIdList.update({participantsFriends});
  });
}

function deleteDuplicatesActionPendings(firebase, auth, notification){
  firebase.child(`users/${auth.id}`).once('value', snapshotUser => {
    const pendingActions = Object.values(snapshotUser.val().pendingActions).filter( actionPending => JSON.stringify(actionPending) !== JSON.stringify(notification) );
    firebase.child(`users/${auth.id}`).update({pendingActions});
  });
}

function addListToCalendar(firebase, auth, idList){
  firebase.child(`lists`).once('value', snapshotLists => {
    const date = snapshotLists.val()[idList].date;
    addToCalendar(firebase, auth, idList, date);
  });
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

    firebase.child('users').once('value', snapshot => {
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

function addFriend(notification){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const nameOther = notification.name;
      new Promise( resolve => {
        firebase.child(`users/${auth.id}`).once('value', snapshotUser => {
          const friends = snapshotUser.val().friends!==undefined ? snapshotUser.val().friends.concat(nameOther) : [nameOther];
          firebase.child(`users/${auth.id}`).update({friends});
          resolve(snapshotUser.val().name);
        });
      }).then( (nameUser) => {
        addMeAsFriendToOtherUser(firebase, auth, notification, nameUser);
      });
  };
}

function addMeAsFriendToOtherUser(firebase, auth, notification, nameUser){
  const idOtherUser = notification.idUser;
  new Promise(resolve => {
      firebase.child(`users/${idOtherUser}/friends`).once('value', snapshotFriendList => {
        const friends = snapshotFriendList.val()!==null ? snapshotFriendList.val().concat(nameUser) : [nameUser];
        resolve(firebase.child(`users/${idOtherUser}`).update({friends}));
      });
  }).then( () => {
    deleteDuplicatesActionPendings(firebase, auth, notification);
  });
}

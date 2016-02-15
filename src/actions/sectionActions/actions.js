import { getActualDate } from '../../utils/functions';
import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR, EDIT_LIST_ERROR, ADD_FRIEND_TO_LIST, CLEAN_ALERT } from './action-types';
import { SET_ALERT } from '../alerts';
//import sequencer from '../sequencer';

const convertDay = date => date.split('/')[0][0]==='0' ? date.split('/')[0][1] : date.split('/')[0];
const convertMonth = date => date.split('/')[1][0]==='0' ? date.split('/')[1][1] : date.split('/')[1];

const months = [ '', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];


export function setList(lists){
  return { type: SET_LIST, lists};
}

/*  ADD LIST  */
export function addList(title, date, importance){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    new Promise(resolve => {
      firebase.child(`users/${auth.id}`).once('value', snapshot => {
        let fireReference = firebase.child('lists').push({title, date, importance, admin: [snapshot.val().name], participantsFriends:[snapshot.val().name]}, error => {
            if(error){
              console.error('ERROR @ addList:', error);
              dispatch({
                type: ADD_LIST_ERROR,
                payload: error
              });
            }else{
              //ACTION ADD TO ALL LISTS
              const idList = fireReference.key();
              addToCalendar(firebase, auth, idList, date);
              //ACTION ADD TO USER LISTS
              const refListsUser = firebase.child(`users/${auth.id}/lists`);
              const refUser = firebase.child(`users/${auth.id}`);
              resolve(addListToUserList(refListsUser, refUser, idList));
            }
        });
      });
    }).then( () => {
      setTimeout( () => dispatch({
        type: SET_ALERT,
        msg: 'List added',
        msgType: 'add'
      }), 1000);
    });


  };
}

function addListToUserList(refListsUser, refUser, idList){
  refListsUser.once('value', snapshot => {
    const lists = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
    refUser.update({lists});
  });
}

/* REMOVE LIST*/
export function removeList(list){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    const idList = list.id;
    //ACTION REMOVE LIST IN ALL participants
    if(list.participantsFriends[0]!==undefined){
      removeListInAllParticipants(firebase, list);
    }
    //REMOVE ACTIONSPENGIG WITH IDLIST IN ALL THE USERS
    removeActionsPendingsWithListIdFromAllTheUsers(firebase, idList);
    new Promise(resolve => {
      firebase.child(`lists/${list.id}`).remove(error => {
        if(error){
          console.error('ERROR @ removeList:', error);
          dispatch({
            type: REMOVE_LIST_ERROR,
            payload: error
          });
        }else{
          const date = list.date;
          // REMOVE FROM DAY
          list.participantsFriends.map( function(name){
            firebase.child('users').once('value', snapshotUsers => {
              Object.keys(snapshotUsers.val()).map( idUser => snapshotUsers.val()[idUser].name === name ? removeFromCalendar(firebase, snapshotUsers.val()[idUser], idList, date) : '');
            });
          });
          //REMOVE COMMENTS OF THE LIST
          resolve(firebase.child(`comments/${list.id}`).remove());
        };
      });
    }).then( () => {
      setTimeout( () => dispatch({
        type: SET_ALERT,
        msg: 'List removed',
        msgType: 'remove'
      }), 1000);
    });

  };
}

function removeListInAllParticipants(firebase, list){
  firebase.child(`lists/${list.id}/participantsFriends`).once('value', snapshot => {
    if(snapshot.val()!==null){
      snapshot.val().map( nameUser => firebase.child(`users`).once('value', function(snapshotUsers){
        const user = Object.values(snapshotUsers.val()).filter( user => user.name===nameUser )[0];
        const userId = Object.keys(snapshotUsers.val()).filter( id => snapshotUsers.val()[id].name===user.name)[0];
        if(user.lists!==undefined){
          const lists = user.lists.filter( listId => list.id!==listId );
          firebase.child(`users/${userId}`).update({lists});
        }
      }));
    }
  });
}

function removeActionsPendingsWithListIdFromAllTheUsers(firebase, idList){
  firebase.child(`users`).once('value', snapshotUsers => {
    let pendingActions;
    let userId;
    const users = Object.values(snapshotUsers.val());
    users.map( function(userIterate){
      if(userIterate.pendingActions!==undefined){
        pendingActions = userIterate.pendingActions.filter( action => action.idList!==idList);
        userId = Object.keys(snapshotUsers.val()).filter( userId => snapshotUsers.val()[userId].name===userIterate.name );
        firebase.child(`users/${userId}`).update({pendingActions});
      }
    });
  });
}




/*  EDIT   */

export function editList(idList, title, date, newDate, importance){

  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`lists/${idList}`).once('value', snapshot => {
      const participantsFriends = snapshot.val().participantsFriends!==undefined ? snapshot.val().participantsFriends : [];
      const participantsGroups = snapshot.val().participantsGroups!==undefined ? snapshot.val().participantsGroups : [];
      const admin = snapshot.val().admin!==undefined ? snapshot.val().admin : [];
      firebase.child(`lists/${idList}`).set({ admin, title, date:newDate, importance, participantsFriends, participantsGroups }, error => {
        if(error){
          console.error('ERROR @ editList:', error);
          dispatch({
            type: EDIT_LIST_ERROR,
            payload, error
          });
        }else{

          removeFromCalendar(firebase, auth, idList, date);
          addToCalendar(firebase, auth, idList, newDate);

        }
      });
    });
  };
}

/*    ADD FRIENDS AND GROUPS IN LISTS   */
export function addFriendGroupToList( list, newParticipant){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    if (newParticipant.img!==undefined) {//ENVIARLA AL USER
      sendActionPendingToUser(auth, list, firebase, newParticipant);
    }else{//añadir el grupo
      firebase.child(`lists/${list.id}`).once('value', listSnapshot => {
        const participantsGroups = listSnapshot.val().participantsGroups!==undefined ?  listSnapshot.val().participantsGroups.concat(newParticipant.name) : [newParticipant.name];
        firebase.child(`lists/${list.id}`).update({participantsGroups});
      });
    }

  };
}

function sendActionPendingToUser(auth, list, firebase, newParticipant){
  firebase.child('users').once('value', userSnapshot => {
    //CREAR LA ACCION PENDING
    const nameUserCreateAction = userSnapshot.val()[auth.id].name;
    const descr = nameUserCreateAction + ' wants to add you to the list: ' + list.title;
    const date = getActualDate();
    const newActionPending = {
      type: ADD_FRIEND_TO_LIST,
      idList: list.id,
      descr,
      date
    };
    let pendingActions = Object.values(userSnapshot.val()).reduce( (init, user) => user.name===newParticipant.name ? user.pendingActions : init, [] );
    pendingActions = pendingActions===undefined ? [newActionPending] : pendingActions.concat(newActionPending);
    const idUser = Object.keys(userSnapshot.val()).filter( idUser => userSnapshot.val()[idUser].name===newParticipant.name);
    firebase.child(`users/${idUser}`).update({pendingActions});
  });
}

/*    REMOVE FRIENDS AND GROUPS IN LISTS   */
export function removeFriendGroupToList( idList, participant){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refIdList = firebase.child(`lists/${idList}`);
//para diferenciar grupo de amigo newParticipant.administrador===undefined
    if(participant.administrador===undefined){
      removeIdUserFromFriendsParticipants(participant, firebase, idList);
      //borrar la lista al usuario
      firebase.child('users').once('value', snapshot => {
        const idUser = Object.keys(snapshot.val()).filter( idUser => snapshot.val()[idUser].name===participant.name);
        const lists = snapshot.val()[idUser].lists.filter( id => id!==idList);
        firebase.child(`users/${idUser}`).update({lists});
      });
    }else{
      //borrar el idGroup en la lista de partidcipantes
      firebase.child(`lists/${idList}/participantsGroups`).once('value', snapshot => {
        const participantsGroups = snapshot.val()===null ? [] : snapshot.val().filter( iterableNameGroups => iterableNameGroups!==participant.name );
        refIdList.update({participantsGroups});
      });
    }
  };
}

function removeIdUserFromFriendsParticipants(participant, firebase, idList){
  firebase.child(`lists/${idList}/participantsFriends`).once('value', snapshot => {
    const participantsFriends = snapshot.val()===null ? [] : snapshot.val().filter( iterableNameUsers => iterableNameUsers!==participant.name );
    firebase.child(`lists/${idList}`).update({participantsFriends});
  });
}

/*     ACTIONS CALENDAR     */
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

function removeFromCalendar(firebase, auth, idList, date){


  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];

  const refDate = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${auth.id}/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==idList );
    refMonth.update({[dayNumber]:listsInDay});
  });
}

export function cleanAlert(){
  return (dispatch) => {
    dispatch({
      type: CLEAN_ALERT
    });
  };
}

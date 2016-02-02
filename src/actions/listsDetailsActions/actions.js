import { SET_LIST, ADD_LIST_ERROR, REMOVE_LIST_ERROR, EDIT_LIST_ERROR } from './action-types';
import { pushState } from 'redux-router';
const convertDay = date => date.split('/')[0][0]==='0' ? date.split('/')[0][1] : date.split('/')[0];
const convertMonth = date => date.split('/')[1][0]==='0' ? date.split('/')[1][1] : date.split('/')[1];

const months = [ '', 'Enero', 'Febrero',
'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto',
'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ];


export function setList(lists){
  return { type: SET_LIST, lists};
}


export function addList(title, date, importance){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();


    firebase.child(`users/${auth.id}`).once('value', snapshot => {
      let fireReference = firebase.child('lists').push({title, date, importance, admin: [snapshot.val().name], participants:[]}, error => {
          if(error){
            console.error('ERROR @ addList:', error);
            dispatch({
              type: ADD_LIST_ERROR,
              payload: error
            });
          }else{
            //ACTION ADD TO ALL LISTS
            const idList = fireReference.key();
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
            //ACTION ADD TO USER LISTS

            const refListsUser = firebase.child(`users/${auth.id}/lists`);
            const refUser = firebase.child(`users/${auth.id}`);
            let lists = [];
            refListsUser.once('value', snapshot => {
              lists = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
              refUser.update({lists});
            });

          }
      });

    });

  };
}

/*function addToCalendarNewDate(firebase, idList, date){
  // get day
  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];


  const refDate = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [idList] : snapshot.val().concat([idList]);
    refMonth.update({[dayNumber]:listsInDay});
  });
}*/

export function removeList(list){
  return (dispatch, getState) => {

    const { firebase, auth } = getState();
    let lists = [];
    //ACTION REMOVE LIST IN ALL participants
    if(list.participantsFriends[0]!==undefined){
      firebase.child(`lists/${list.id}/participantsFriends`).once('value', snapshot => {
        if(snapshot.val()!==null){
          snapshot.val().map( nameUser => firebase.child(`users`).once('value', function(snapshotUsers){
            const user = Object.values(snapshotUsers.val()).filter( user => user.name===nameUser )[0];
            const userId = Object.keys(snapshotUsers.val()).filter( id => snapshotUsers.val()[id].name===user.name)[0];
            if(user.lists!==undefined){
              lists = user.lists.filter( listId => list.id!==listId );
            }
            firebase.child(`users/${userId}`).update({lists});
          }));
        }
      });
    }
    //REMOVE ACTIONSPENGIG WITH IDLIST IN ALL THE USERS
    firebase.child(`users`).once('value', snapshotUsers => {
      let pendingActions;
      const users = Object.values(snapshotUsers.val());
      users.map( function(userIterate){
        if(userIterate.pendingActions!==undefined){
          pendingActions = userIterate.pendingActions.filter( action => action.idList!==list.id );
          let userId = Object.keys(snapshotUsers.val()).filter( userId => snapshotUsers.val()[userId].name===userIterate.name );
          firebase.child(`users/${userId}`).update({pendingActions});
        }
      });
    });


    firebase.child(`lists/${list.id}`).remove(error => {
      if(error){
        console.error('ERROR @ removeList:', error);
        dispatch({
          type: REMOVE_LIST_ERROR,
          payload: error
        });
      }else{

      const idList = list.id;
      const date = list.date;
      // get day
      removeFromCalendar(firebase, auth, idList, date);


      //ACTION REMOVE TO USER LISTS

      const refListsUser = firebase.child(`users/${auth.id}/lists`);
      const refUser = firebase.child(`users/${auth.id}`);
      lists = [];
      refListsUser.once('value', snapshot => {
        lists = snapshot.val()===null ? [] : snapshot.val().filter(id => id!==list.id);
        refUser.update({lists});
      });

      firebase.child(`comments/${list.id}`).remove();

      };
    });
    dispatch(pushState(null, '/'));
  };
}


/*function removeDateFromCalendar(firebase, idList, date){
  // get day
  const dayNumber = convertDay(date);

  //get month
  const monthNumber = convertMonth(date);
  const monthName = months[monthNumber];

  const refDate = firebase.child(`calendar/${date.split('/')[2]}/${monthName}/${dayNumber}`);
  const refMonth = firebase.child(`calendar/${date.split('/')[2]}/${monthName}`);
  let listsInDay = [];
  refDate.once('value', snapshot => {
    listsInDay = snapshot.val()===null ? [] : snapshot.val().filter( iterableIdList => iterableIdList!==idList );
    refMonth.update({[dayNumber]:listsInDay});
  });
}*/

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


export function addFriendGroupToList( list, newParticipant){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();

    //ENVIARLA AL USER
    if (newParticipant.img!==undefined) {
      firebase.child('users').once('value', userSnapshot => {
        //CREAR LA ACCION PENDING
        const nameUserCreateAction = userSnapshot.val()[auth.id].name;
        const descr = nameUserCreateAction + ' wants to add you to the list: ' + list.title;
        const newActionPending = {
          type: ADD_FRIEND_TO_LIST,
          idList: list.id,
          descr
        };

        let pendingActions = Object.values(userSnapshot.val()).reduce( (init, user) => user.name===newParticipant.name ? user.pendingActions : init, [] );
        pendingActions = pendingActions===undefined ? [newActionPending] : pendingActions.concat(newActionPending);
        const idUser = Object.keys(userSnapshot.val()).filter( idUser => userSnapshot.val()[idUser].name===newParticipant.name);
        firebase.child(`users/${idUser}`).update({pendingActions});
      });
    }else{//añadir el grupo
      firebase.child(`lists/${list.id}`).once('value', listSnapshot => {
        const participantsGroups = listSnapshot.val().participantsGroups!==undefined ?  listSnapshot.val().participantsGroups.concat(newParticipant.name) : [newParticipant.name];
        firebase.child(`lists/${list.id}`).update({participantsGroups});
      });
    }

  };
}

export function removeFriendGroupToList( idList, participant){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refIdList = firebase.child(`lists/${idList}`);


//para diferenciar grupo de amigo newParticipant.administrador===undefined
    if(participant.administrador===undefined){

      //borrar el idUser en la lista de partidcipantes
      firebase.child(`lists/${idList}/participantsFriends`).once('value', snapshot => {
        const participantsFriends = snapshot.val()===null ? [] : snapshot.val().filter( iterableNameUsers => iterableNameUsers!==participant.name );
        refIdList.update({participantsFriends});
      });
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

export function addTask( idList, title){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    let ref = firebase.child('tasks').push({idList, title, done:false}, error => {
        if(error){
          console.error('ERROR @ addList:', error);
          dispatch({
            type: ADD_LIST_ERROR,
            payload: error
          });
        }else{
          const idTask = ref.key();
          firebase.child(`tasks/${idTask}`).update({id: idTask, idList, title, done:false});

          //ACTION ADD TO USER LISTS
          let tasks = [];

          firebase.child(`users/${auth.id}/tasks`).once('value', snapshot => {
            tasks = snapshot.val()===null ? [idTask] : snapshot.val().concat([idTask]);
            firebase.child(`users/${auth.id}`).update({tasks});
          });
        }
    });
  };
}

export function removeTask( idTask ){
  return (dispatch, getState) => {
    const { firebase, auth } = getState();
    firebase.child(`tasks/${idTask}`).remove();

    //ACTION ADD TO USER LISTS

    const refTasksUser = firebase.child(`users/${auth.id}/tasks`);
    const refUser = firebase.child(`users/${auth.id}`);
    let tasks = [];
    refTasksUser.once('value', snapshot => {
      tasks = snapshot.val()===null ? [] : snapshot.val().filter(id => id!==idTask);
      refUser.update({tasks});
    });
  };
}

export function editTask( idTask, title){
  return (dispatch, getState) => {
    const { firebase } = getState();
    firebase.child('tasks').once('value', snapshot => {
      const editedTask = Object.assign({}, snapshot.val().idTask, {title});
      firebase.child(`tasks/${idTask}`).update(editedTask);
    });
  };
}

export function addFriendGroupToTask(idTask, id){
  return (dispatch, getState) => {
    const { firebase } = getState();
    const refParticipants = firebase.child(`tasks/${idTask}/participants`);
    const refIdList = firebase.child(`tasks/${idTask}`);
    let participants = [];

    refParticipants.once('value', snapshot => {
      participants = snapshot.val()===null ? [id] : snapshot.val().concat([id]);
      refIdList.update({participants});
    });

  };
}


export function markAsDone(id){
  return (dispatch, getState) => {
    const {firebase} = getState();
    const taskRef = firebase.child(`tasks/${id}`);
    taskRef.once('value', snapshot => {
      const isDone = !snapshot.val().done;
      taskRef.update({done:isDone});
    });
  };
};
